'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState, useEffect, useCallback } from 'react'
import { ExternalLink, Plus, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useNewsData } from '../hooks/news'
import { useStockPrice } from '../hooks/stockPrice'
import { fetchAllStocks } from '../actions/fetchStocks'
import type { Stock, Watchlist, PortfolioSummary } from '@/app/types/watchlist'
import { getDefaultWatchlist,fetchAllWatchlist,createWatchlist,fetchWatchlist } from '../actions/watchlistActions'
import { addStockToWatchlist } from '../actions/addStocksToWatchlists'
import { number } from 'zod'



export default function Dashboard() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [watchlists, setWatchlists] = useState<Watchlist[]>([])
  const [selectedWatchlist, setSelectedWatchlist] = useState<number>(0)
  const [availableStocks, setAvailableStocks] = useState<Stock[]>([])
  const [portfolioSummary, setPortfolioSummary] = useState<PortfolioSummary>({
    totalValue: 0,
    todayChange: 0,
    todayChangePercent: 0
  })
  
  const currentWatchlist = watchlists.find(w => w.id === selectedWatchlist)
  const allSectors = [...new Set(watchlists.flatMap(w => w.stocks.map(s => s.type)))]
  
  // Get real-time prices for all stocks across watchlists
  // const allSymbols = [...new Set(watchlists.flatMap(w => w.stocks.map(s => s.ticker)))]
  const allSymbols =["BINANCE:BTCUSD","BINANCE:ETHUSD","BINANCE:XRPUSD","BINANCE:LTCUSD",]
  const realtimePrices = useStockPrice(allSymbols)
  const { news, loading: newsLoading } = useNewsData(allSectors)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace("/")
    }
  }, [status, router])

  useEffect(() => {
    const initializeWatchlists = async () => {
      try {
        const defaultWatchlist = await getDefaultWatchlist()
        const allWatchlists = await fetchAllWatchlist(session?.user?.id!) 
        setWatchlists([defaultWatchlist, ...allWatchlists])
        setAvailableStocks(defaultWatchlist.stocks)
      } catch (error) {
        console.error('Failed to initialize watchlists:', error)
      }
    }
    if (session?.user?.id) {
      initializeWatchlists()
    }
  }, [session?.user?.id])

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetchAllStocks()
        if (!response) throw new Error("failed to fetch")
        setAvailableStocks(response)
      } catch (err) {
        console.error("Error fetching stocks:", err)
      }
    }
    fetchStocks()
  }, [])

  useEffect(() => {
    const totalValue = watchlists
      .flatMap(w => w.stocks)
      .reduce((sum, stock) => sum + (realtimePrices[stock.ticker] || 0), 0)

    setPortfolioSummary({
      totalValue,
      todayChange: 1000, // This should be calculated based on opening prices
      todayChangePercent: (1000 / totalValue) * 100
    })
  }, [realtimePrices, watchlists])

  const handleAddWatchlist = async (name: string) => {
    try {
      const newWatchlist = await createWatchlist({name:name,uid:session?.user?.id})
      setWatchlists(prev => [...prev, newWatchlist])
    } catch (error) {
      console.error('Failed to create watchlist:', error)
    }
  }

  const handleAddStockToWatchlist = async (ticker: string) => {
    if (selectedWatchlist) {
      try {
        await addStockToWatchlist(selectedWatchlist, ticker)
        const updatedWatchlist = await fetchWatchlist(selectedWatchlist)
        setWatchlists(prev => prev.map(w => w.id === selectedWatchlist ? updatedWatchlist : w))
      } catch (error) {
        console.error('Failed to add stock to watchlist:', error)
      }
    }
  }

  const handleRemoveStock = async (watchlistId: number, ticker: string) => {
    try {
      await removeStockFromWatchlist(watchlistId, ticker)
      const updatedWatchlist = await fetchWatchlist(watchlistId)
      setWatchlists(prev => prev.map(w => w.id === watchlistId ? updatedWatchlist : w))
    } catch (error) {
      console.error('Failed to remove stock from watchlist:', error)
    }
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Hi, {session?.user?.name || 'User'}</h1>
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
            <form onSubmit={(e) => {
              e.preventDefault()
              const name = (e.currentTarget.elements.namedItem('name') as HTMLInputElement).value
              handleAddWatchlist(name)
            }}>
              <Input name="name" placeholder="Watchlist name" className="mb-4" />
              <Button type="submit">Create</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px,1fr]">
        <div className="space-y-4">
          <Select value={selectedWatchlist.toString()} onValueChange={(value) => setSelectedWatchlist(Number(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Select a watchlist" />
            </SelectTrigger>
            <SelectContent>
              {watchlists.map(watchlist => (
                <SelectItem key={watchlist.id} value={watchlist.id.toString()}>
                  {watchlist.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {currentWatchlist && (
            <div className="p-4 border rounded-lg">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">{currentWatchlist.name}</h2>
                </div>
                <Select onValueChange={handleAddStockToWatchlist}>
                  <SelectTrigger>
                    <SelectValue placeholder="Add stock" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableStocks.map(stock => (
                      <SelectItem key={stock.id} value={stock.ticker}>
                        {stock.ticker} - {stock.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 mt-4">
                {currentWatchlist.stocks.map(stock => {
                  const currentPrice = realtimePrices[stock.ticker]
                  
                  return (
                    <div
                      key={stock.id}
                      className="flex items-center justify-between p-2 bg-muted rounded"
                    >
                      <div>
                        <div className="font-medium">{stock.ticker}</div>
                        <div className="text-sm text-muted-foreground">{stock.name}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="font-mono">
                          {currentPrice ? `₹${currentPrice.toFixed(2)}` : 'Loading...'}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveStock(currentWatchlist.id, stock.ticker)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Value</span>
                  <span className="text-2xl font-bold">
                    ₹{portfolioSummary.totalValue.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Today's Change</span>
                  <div className={`text-lg ${portfolioSummary.todayChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {portfolioSummary.todayChange >= 0 ? '+' : ''}
                    ₹{portfolioSummary.todayChange.toFixed(2)} 
                    ({portfolioSummary.todayChangePercent.toFixed(2)}%)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Market News</CardTitle>
          </CardHeader>
          <CardContent>
            {newsLoading ? (
              <div className="text-center py-4">Loading news...</div>
            ) : news.length === 0 ? (
              <div className="text-center py-4">No news available</div>
            ) : (
              <div className="space-y-4">
                {news.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-medium">{item.headline}</h3>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        Read more
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{item.summary}</p>
                    <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                      <span>{item.source}</span>
                      <span>{new Date(item.datetime * 1000).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}







// const generateId = () => {
//   return Date.now().toString();
// };

// export default function Dashboard() {
//   const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
//   const [selectedWatchlist, setSelectedWatchlist] = useState<string>('');
//   const [currentTime, setCurrentTime] = useState<string>('');
//   const [isClient, setIsClient] = useState(false);
  
//   // Call the hook unconditionally at the top level
//   const bitcoinPrice = useStockPrice();

//   // Initialize state after component mounts
//   useEffect(() => {
//     setWatchlists([{ id: '1', name: 'Default', stocks: [] }]);
//     setSelectedWatchlist('1');
//     setIsClient(true);
//   }, []);

//   // Handle time updates separately
//   useEffect(() => {
//     const updateTime = () => {
//       setCurrentTime(new Date().toLocaleTimeString());
//     };
    
//     updateTime();
//     const interval = setInterval(updateTime, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const addWatchlist = (name: string) => {
//     setWatchlists(prev => [...prev, {
//       id: generateId(),
//       name,
//       stocks: []
//     }]);
//   };

//   const currentWatchlist = watchlists.find(w => w.id === selectedWatchlist);

//   if (!isClient) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold">Hi, Harshad</h1>
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button>
//               <Plus className="w-4 h-4 mr-2" />
//               New Watchlist
//             </Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Create New Watchlist</DialogTitle>
//             </DialogHeader>
//             <form onSubmit={(e) => {
//               e.preventDefault();
//               const formData = new FormData(e.currentTarget);
//               const name = formData.get('name') as string;
//               if (name) addWatchlist(name);
//             }}>
//               <Input name="name" placeholder="Watchlist name" className="mb-4" />
//               <Button type="submit">Create</Button>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <div className="grid gap-6 md:grid-cols-[300px,1fr]">
//         <div className="space-y-4">
//           {watchlists.length > 0 && (
//             <Select value={selectedWatchlist} onValueChange={setSelectedWatchlist}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select a watchlist" />
//               </SelectTrigger>
//               <SelectContent>
//                 {watchlists.map(watchlist => (
//                   <SelectItem key={watchlist.id} value={watchlist.id}>
//                     {watchlist.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           )}

//           {currentWatchlist && (
//             <div className="p-4 border rounded-lg">
//               <div className="flex flex-col gap-4">
//                 <div className="flex items-center justify-between">
//                   <h2 className="font-semibold">{currentWatchlist.name}</h2>
//                 </div>
                
//                 <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <div className="font-medium">Bitcoin (BTCUSDT)</div>
//                       <div className="text-sm text-muted-foreground">Binance</div>
//                     </div>
//                     <div className="font-mono text-lg">
//                       {bitcoinPrice 
//                         ? `$${bitcoinPrice.toFixed(2)}` 
//                         : 'Loading...'}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="grid gap-6">
//           <div className="grid gap-4 p-6 border rounded-lg">
//             <h2 className="font-semibold">Market Overview</h2>
//             <div className="grid gap-2">
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">Bitcoin Price</span>
//                 <span className="font-mono">
//                   {bitcoinPrice 
//                     ? `$${bitcoinPrice.toFixed(2)}` 
//                     : 'Loading...'}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">Last Updated</span>
//                 <span>{currentTime}</span>
//               </div>
//             </div>
//           </div>

//           <div className="grid gap-4 p-6 border rounded-lg">
//             <h2 className="font-semibold">Price History</h2>
//             <div style={{ width: "100%", height: "500px" }}>
//                     <TradingViewChart/>
//       </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

