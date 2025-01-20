'use client'

import React, { useState, useEffect } from 'react';
import { User, Plus, TrendingUp, TrendingDown, Trash2, X, Newspaper } from 'lucide-react';
import {Card, CardContent} from './ui/card'
 import { Dialog ,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger} from './ui/dialog'
  import {
    Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  } from './ui/select'
import { Button } from './ui/button';
import { Input } from './ui/input';

import {  createWatchlist, addStockToWatchlist, removeStockFromWatchlist, getUserWatchlists,deleteWatchlist } from '@/app/actions/watchlist';
import { getStocks } from '@/app/actions/stock';
import { useBulkPrices } from '@/app/hooks/usePriceServices';
import { useNewsData } from '@/app/hooks/news';
import TradingViewChart from './tradingview';
import { useToast } from '@/hooks/use-toast';
import { useSession } from 'next-auth/react';
type Stock = {
  ticker: string
  name: string
}

type WatchlistStock = {
  stocks: Stock
}

type Watchlist = {
  id: number
  name: string
  stocks: WatchlistStock[]
}

export default function WatchlistSection() {
  const [watchlists, setWatchlists] = useState<Watchlist[]>([])
  const [selectedWatchlist, setSelectedWatchlist] = useState<number | null>(null)
  const [availableStocks, setAvailableStocks] = useState<Stock[]>([])
  const [selectedStock, setSelectedStock] = useState<string>("")
  const [isAddingToWatchlist, setIsAddingToWatchlist] = useState(false)
  const [selectedCrypto, setSelectedCrypto] = useState<Stock | null>(null)
  const [currentTime, setCurrentTime] = useState<string>("")
  const { toast } = useToast()
  const session=useSession();
  const tickers = watchlists.flatMap((w) => w.stocks).map((s) => s.stocks.ticker + "USDT")
  const prices = useBulkPrices(tickers)
  const sp = prices[selectedCrypto?.ticker.concat("USDT") || tickers[0]]

  const { news, loading: newsLoading } = useNewsData(selectedCrypto?.ticker || "")

  useEffect(() => {
    const loadStocks = async () => {
      const result = await getStocks()
      if (result.success) {
        setAvailableStocks(result.data)
      }
    }

    const loadWatchlists = async () => {
      // Replace with actual user ID from auth
      const userId = session.data?.user.id
      const result = await getUserWatchlists(userId)
      if (result.success) {
        setWatchlists((prevWatchlists) => {
          const defaultWatchlist = prevWatchlists.find((w) => w.id === 0)
          return defaultWatchlist ? [defaultWatchlist, ...result.data.filter((w) => w.id !== 0)] : prevWatchlists
        })
        setSelectedWatchlist(0)
      }
    }

    loadStocks()
    loadWatchlists()
  }, [])

  useEffect(() => {
    const defaultWatchlist = {
      id: 0,
      name: "Default Watchlist",
      stocks: [
        { stocks: { ticker: "ETH", name: "Ethereum" } },
        { stocks: { ticker: "BTC", name: "Bitcoin" } },
        { stocks: { ticker: "BNB", name: "Binance Coin" } },
        { stocks: { ticker: "SOL", name: "SOLANA" } },
      ],
    }

    setWatchlists((prevWatchlists) => {
      const existingDefaultWatchlist = prevWatchlists.find((w) => w.id === 0)
      if (!existingDefaultWatchlist) {
        return [defaultWatchlist, ...prevWatchlists]
      }
      return prevWatchlists
    })

    setSelectedWatchlist(0)
  }, [])

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString())
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleCreateWatchlist = async (name: string) => {
    // Replace with actual user ID from auth
    const userId = 1
    const result = await createWatchlist(userId, name)
    if (result.success) {
      toast({
        title: `Watchlist ${name} created`,
        description: "Successfully created",
        variant: "default",
      })
      // Refresh watchlists
      const watchlistsResult = await getUserWatchlists(userId)
      if (watchlistsResult.success) {
        setWatchlists((prevWatchlists) => {
          const defaultWatchlist = prevWatchlists.find((w) => w.id === 0)
          return defaultWatchlist
            ? [defaultWatchlist, ...watchlistsResult.data.filter((w) => w.id !== 0)]
            : prevWatchlists
        })
      }
    } else {
      toast({
        title: `Failed to create watchlist`,
        description: result.error || "Failed to create watchlist",
        variant: "destructive",
      })
    }
  }

  const handleAddStock = async () => {
    if (!selectedWatchlist || !selectedStock) return

    const result = await addStockToWatchlist(selectedWatchlist, selectedStock)
    if (result.success) {
      toast({
        title: `Added stock ${selectedStock} successfully`,
        description: "Successfully added ",
      })
      setIsAddingToWatchlist(false)
      // Refresh watchlists
      const userId = 1 // Replace with actual user ID from auth
      const watchlistsResult = await getUserWatchlists(userId)
      if (watchlistsResult.success) {
        setWatchlists(watchlistsResult.data)
      }
    } else {
      toast({
        title: "Failure",
        description: "Failed to  add the stock ",
        variant: "destructive",
      })
    }
  }

  const handleRemoveStock = async (watchlistId: number, stockTicker: string) => {
    const result = await removeStockFromWatchlist(watchlistId, stockTicker)
    if (result.success) {
      toast({
        title: `Removed ${stockTicker} successfully`,
        description: "Successfully removed from watchlist",
        variant: "destructive",
      })
      // Refresh watchlists
      const userId = 1 // Replace with actual user ID from auth
      const watchlistsResult = await getUserWatchlists(userId)
      if (watchlistsResult.success) {
        setWatchlists(watchlistsResult.data)
      }
    } else {
      toast({
        description: "Failed to  remove",
      })
    }
  }
  const handleDeleteWatchlist = async () => {
    if (selectedWatchlist && selectedWatchlist !== 0) {
      const result = await deleteWatchlist(selectedWatchlist)
      if (result.success) {
        toast({
          title: "Success",
          description: "Watchlist deleted successfully",
          variant: "default",
        })
        const watchlistsResult = await getUserWatchlists(1)
        if (watchlistsResult.success) {
          setWatchlists((prevWatchlists) => {
            const defaultWatchlist = prevWatchlists.find((w) => w.id === 0)
            return defaultWatchlist
              ? [defaultWatchlist, ...watchlistsResult.data.filter((w) => w.id !== 0)]
              : prevWatchlists
          })
          setSelectedWatchlist(0)
        }
      } else {
        toast({
          title: "Error",
          description: "Failed to delete watchlist",
          variant: "destructive",
        })
      }
    } else if (selectedWatchlist === 0) {
      toast({
        title: "Error",
        description: "Cannot delete the default watchlist",
        variant: "destructive",
      })
    }
  }

  const getCurrentWatchlist = () => {
    return watchlists.find((w) => w.id === selectedWatchlist)
  }

  if (selectedCrypto) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setSelectedCrypto(null)} className="mr-4">
              ← Back
            </Button>
            <h1 className="text-2xl font-bold">{selectedCrypto.name} Dashboard</h1>
          </div>
        </div>

        <div className="grid gap-6">
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Market Overview</h2>
            <div className="grid gap-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price</span>
                <span className="font-mono">{sp ? `$${sp.toFixed(2)}` : "Loading..."}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span>{currentTime}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-semibold mb-4">Price Chart</h2>
            <div style={{ width: "100%", height: "500px" }}>
              <TradingViewChart symbol={selectedCrypto.ticker} />
            </div>
          </Card>

          {!newsLoading && news.length > 0 && (
            <Card className="p-6">
              <h2 className="font-semibold mb-4">Related News</h2>
              <div className="space-y-4">
                {news.map((item, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                      <h3 className="font-medium mb-2">{item.headline}</h3>
                      <p className="text-sm text-muted-foreground">{item.summary}</p>
                    </a>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium">John Doe</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Current Watchlist:</span>
            <Select
              value={selectedWatchlist?.toString()}
              onValueChange={(value) => setSelectedWatchlist(Number.parseInt(value))}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a watchlist" />
              </SelectTrigger>
              <SelectContent>
                {watchlists.map((watchlist) => (
                  <SelectItem key={watchlist.id} value={watchlist.id.toString()}>
                    {watchlist.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDeleteWatchlist}
              className="text-destructive hover:text-destructive/90"
              disabled={selectedWatchlist === 0}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Dialog open={isAddingToWatchlist} onOpenChange={setIsAddingToWatchlist}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Stock
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Stock to Watchlist</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <Select value={selectedStock} onValueChange={setSelectedStock}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a stock" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableStocks.map((stock) => (
                      <SelectItem key={stock.ticker} value={stock.ticker}>
                        {stock.name} ({stock.ticker})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleAddStock} disabled={!selectedStock || !selectedWatchlist}>
                  Add to Watchlist
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Watchlist
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Watchlist</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  const name = formData.get("name") as string
                  if (name) handleCreateWatchlist(name)
                }}
              >
                <Input name="name" placeholder="Watchlist name" className="mb-4" />
                <Button type="submit">Create</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {getCurrentWatchlist()?.stocks.map(({ stocks: stock }) => (
          <Card
            key={stock.ticker}
            className="relative cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedCrypto(stock)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10"
              onClick={(e) => {
                e.stopPropagation()
                if (selectedWatchlist) {
                  handleRemoveStock(selectedWatchlist, stock.ticker)
                }
              }}
            >
              <X className="w-4 h-4" />
            </Button>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">{stock.name}</h2>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{stock.ticker}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Price:</span>
                  <span className="font-mono">${prices[stock.ticker.concat("USDT")]?.toFixed(2) || "..."}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {getCurrentWatchlist()?.stocks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No stocks in this watchlist. Click below to add stocks.</p>
          <Button onClick={() => setIsAddingToWatchlist(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Stock
          </Button>
        </div>
      )}
      <div className="bg-gray-50 p-6 mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Newspaper className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-xl font-bold">Crypto News</h2>
          </div>

          {newsLoading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading news...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="space-y-4">
                      {item.image && (
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.headline}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                      )}
                      <h3 className="font-semibold hover:text-blue-600 transition-colors">{item.headline}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">{item.summary}</p>
                      <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <span>{new Date(item.datetime * 1000).toLocaleDateString()}</span>
                        <span>{item.source}</span>
                      </div>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

