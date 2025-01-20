import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, TrendingUp, TrendingDown, Loader } from "lucide-react"
import { Input } from '@/components/ui/input';
import { useState, useEffect } from "react";
import { getHoldings } from "@/app/actions/getHoldings";
import { useSession } from "next-auth/react";
import { useBulkPrices } from "@/app/hooks/usePriceServices";
import { sellStock } from "@/app/actions/transaction";
import { useToast } from "@/hooks/use-toast";

interface Holding {
  id: number
  stockticker: string
  quantity: number
  investedAmt: number
  buyprice: number
}

interface PortfolioData {
  id: number
  userid: number
  investedAmount: number
  stocks: Holding[]
}

interface PriceData {
  [symbol: string]: number
}

export default function PortfolioSection() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isPriceLoading, setIsPriceLoading] = useState(true)
  const session = useSession();
  const userID = session?.data?.user?.id
  const [quantities, setQuantities] = useState<{ [key: number]: string }>({})
  const { toast } = useToast()

  // Initialize quantities when portfolio data is loaded
  useEffect(() => {
    if (portfolioData?.stocks) {
      const initialQuantities = portfolioData.stocks.reduce((acc, holding) => ({
        ...acc,
        [holding.id]: ""
      }), {})
      setQuantities(initialQuantities)
    }
  }, [portfolioData])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHoldings(userID)
        setPortfolioData(data)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Error",
          description: "Failed to fetch portfolio data",
          variant: "destructive"
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (userID) {
      fetchData()
    }
  }, [userID, toast])

  const symbols = portfolioData ? [...new Set(portfolioData.stocks.map((holding) => holding.stockticker.concat("USDT")))] : []
  const prices = useBulkPrices(symbols)

  // Monitor price data status
  useEffect(() => {
    if (symbols.length > 0 && prices) {
      const hasValidPrices = symbols.every(symbol => 
        typeof prices[symbol] === 'number' && !isNaN(prices[symbol])
      )
      setIsPriceLoading(!hasValidPrices)
    }
  }, [prices, symbols])

  const calculateTotalValue = () => {
    if (!portfolioData || isPriceLoading) return 0
    return portfolioData.stocks.reduce((sum, holding) => {
      const currentPrice = prices[holding.stockticker.concat("USDT")] || 0
      return sum + holding.quantity * currentPrice
    }, 0)
  }

  const totalValue = calculateTotalValue()
  const totalInvested = portfolioData ? portfolioData.stocks.reduce((sum, holding) => sum + holding.investedAmt, 0) : 0
  const profitLoss = totalValue - totalInvested
  const profitLossPercentage = totalInvested !== 0 ? (profitLoss / totalInvested) * 100 : 0

  const handleQuantityChange = (id: number, value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setQuantities(prev => ({
        ...prev,
        [id]: value
      }))
    }
  }

  const handleSell = async (holding: Holding) => {
    const quantity = Number.parseFloat(quantities[holding.id])
    const price = prices[holding.stockticker.concat("USDT")]

    if (isNaN(quantity) || quantity <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid quantity",
        variant: "destructive"
      })
      return
    }

    if (quantity > holding.quantity) {
      toast({
        title: "Invalid Quantity",
        description: "Quantity exceeds available balance",
        variant: "destructive"
      })
      return
    }

    try {
      const res = await sellStock(holding.id, quantity, price, userID)
      if (res?.success) {
        toast({
          title: "Success",
          description: "Sold successfully",
          variant: "default"
        })
        // Reset the quantity input after successful sale
        setQuantities(prev => ({
          ...prev,
          [holding.id]: ""
        }))
        // Refresh portfolio data
        const updatedData = await getHoldings(userID)
        setPortfolioData(updatedData)
      } else {
        throw new Error("Sale failed")
      }
    } catch (error) {
      toast({
        title: "Failed",
        description: "Transaction failed. Please try again.",
        variant: "destructive"
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (!portfolioData || portfolioData.stocks.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Portfolio Overview</h1>
        <p>Start buying to build your portfolio!</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Empty state cards */}
          {/* ... (keep your existing empty state JSX) ... */}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Portfolio Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Portfolio summary cards */}
        {isPriceLoading ? (
          Array(3).fill(0).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6 flex items-center justify-center">
                <Loader className="w-6 h-6 animate-spin" />
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Value</p>
                    <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
                  </div>
                  <Wallet className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Invested Amount</p>
                    <p className="text-2xl font-bold">${totalInvested.toLocaleString()}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Profit/Loss</p>
                    <div className="flex items-center gap-2">
                      <p className={`text-2xl font-bold ${profitLoss >= 0 ? "text-green-500" : "text-red-500"}`}>
                        ${Math.abs(profitLoss).toLocaleString()}
                      </p>
                      <span className={`text-sm ${profitLoss >= 0 ? "text-green-500" : "text-red-500"}`}>
                        ({profitLossPercentage.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                  {profitLoss >= 0 ? (
                    <TrendingUp className="w-8 h-8 text-green-500" />
                  ) : (
                    <TrendingDown className="w-8 h-8 text-red-500" />
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Holdings</h2>
          <div className="space-y-4">
            {portfolioData.stocks.map((holding) => (
              <div key={holding.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{holding.stockticker}</p>
                  <p className="text-sm text-muted-foreground">{holding.quantity} tokens</p>
                </div>
                <div className="flex items-center gap-4">
                  {isPriceLoading ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <p className={`font-bold ${prices[holding.stockticker.concat("USDT")] * holding.quantity >= holding.investedAmt ? "text-green-500" : "text-red-500"}`}>
                      ${((prices[holding.stockticker.concat("USDT")] * holding.quantity) - holding.investedAmt).toLocaleString()}
                    </p>
                  )}
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      value={quantities[holding.id] || ""}
                      onChange={(e) => handleQuantityChange(holding.id, e.target.value)}
                      placeholder="Qty"
                      className="w-20"
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleSell(holding)}
                      disabled={isPriceLoading}
                    >
                      Sell
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}