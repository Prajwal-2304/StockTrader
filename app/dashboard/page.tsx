'use client'

import { useState, useEffect } from 'react'
import { Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useStockPrice } from '../hooks/stockPrice'
import dynamic from 'next/dynamic'
import TradingViewChart from '@/components/tradingview'

interface Stock{
  name:string,
  symbol:string
}
interface Watchlist{
  id:string,name:string,
  stocks:Stock[]
}

// export default function Dashboard() {
//   const [watchlists, setWatchlists] = useState<Watchlist[]>([
//     { id: '1', name: 'Default', stocks: [] }
//   ])
//   const [selectedWatchlist, setSelectedWatchlist] = useState<string>('1')
//   const [availableStocks, setAvailableStocks] = useState<Stock[]>([])
  
//   // Get real-time prices for all stocks across watchlists
//   const allSymbols = [...new Set(watchlists.flatMap(w => w.stocks.map(s => s.symbol)))]
//   const realtimePrices = stockPrice(allSymbols)

//   // useEffect(() => {
//   //   // Fetch available stocks from backend
//   //   fetch('/api/stocks')
//   //     .then(res => res.json())
//   //     .then(data => setAvailableStocks(data))
//   // }, [])

//   const addWatchlist = (name: string) => {
//     setWatchlists(prev => [...prev, {
//       id: Math.random().toString(),
//       name,
//       stocks: []
//     }])
//   }

//   const addStockToWatchlist = (symbol: string) => {
//     setWatchlists(prev => prev.map(watchlist => {
//       if (watchlist.id === selectedWatchlist) {
//         return {
//           ...watchlist,
//           stocks: [...watchlist.stocks, availableStocks.find(s => s.symbol === symbol)!]
//         }
//       }
//       return watchlist
//     }))
//   }

//   const removeStock = (watchlistId: string, symbol: string) => {
//     setWatchlists(prev => prev.map(watchlist => {
//       if (watchlist.id === watchlistId) {
//         return {
//           ...watchlist,
//           stocks: watchlist.stocks.filter(s => s.symbol !== symbol)
//         }
//       }
//       return watchlist
//     }))
//   }

//   const currentWatchlist = watchlists.find(w => w.id === selectedWatchlist)

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
//               e.preventDefault()
//               const name = new FormData(e.currentTarget).get('name') as string
//               addWatchlist(name)
//             }}>
//               <Input name="name" placeholder="Watchlist name" className="mb-4" />
//               <Button type="submit">Create</Button>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <div className="grid gap-6 md:grid-cols-[300px,1fr]">
//         <div className="space-y-4">
//           <Select value={selectedWatchlist} onValueChange={setSelectedWatchlist}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select a watchlist" />
//             </SelectTrigger>
//             <SelectContent>
//               {watchlists.map(watchlist => (
//                 <SelectItem key={watchlist.id} value={watchlist.id}>
//                   {watchlist.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           {currentWatchlist && (
//             <div className="p-4 border rounded-lg">
//               <div className="flex flex-col gap-4">
//                 <div className="flex items-center justify-between">
//                   <h2 className="font-semibold">{currentWatchlist.name}</h2>
//                 </div>
//                 <Select onValueChange={addStockToWatchlist}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Add stock" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {availableStocks.map(stock => (
//                       <SelectItem key={stock.symbol} value={stock.symbol}>
//                         {stock.symbol} - {stock.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-2 mt-4">
//                 {currentWatchlist.stocks.map(stock => {
//                   const currentPrice = realtimePrices[stock.symbol]
                  
//                   return (
//                     <div
//                       key={stock.symbol}
//                       className="flex items-center justify-between p-2 bg-muted rounded"
//                     >
//                       <div>
//                         <div className="font-medium">{stock.symbol}</div>
//                         <div className="text-sm text-muted-foreground">{stock.name}</div>
//                       </div>
//                       <div className="flex items-center gap-4">
//                         <div className="font-mono">
//                           {currentPrice ? `₹${currentPrice.toFixed(2)}` : 'Loading...'}
//                         </div>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => removeStock(currentWatchlist.id, stock.symbol)}
//                         >
//                           <X className="w-4 h-4" />
//                         </Button>
//                       </div>
//                     </div>
//                   )
//                 })}
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="grid gap-6">
//           <div className="grid gap-4 p-6 border rounded-lg">
//             <h2 className="font-semibold">Equity</h2>
//             <div className="grid gap-2">
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">Margin available</span>
//                 <span>₹0</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">Margins used</span>
//                 <span>₹0</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">Opening balance</span>
//                 <span>₹0</span>
//               </div>
//             </div>
//             <Button variant="link" className="justify-start px-0">
//               View statement
//             </Button>
//           </div>

//           <div className="grid gap-4 p-6 border rounded-lg">
//             <h2 className="font-semibold">Commodity</h2>
//             <div className="grid gap-2">
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">Margin available</span>
//                 <span>₹0</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">Margins used</span>
//                 <span>₹0</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">Opening balance</span>
//                 <span>₹0</span>
//               </div>
//             </div>
//             <Button variant="link" className="justify-start px-0">
//               View statement
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }



const generateId = () => {
  return Date.now().toString();
};

export default function Dashboard() {
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [selectedWatchlist, setSelectedWatchlist] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isClient, setIsClient] = useState(false);
  
  // Call the hook unconditionally at the top level
  const bitcoinPrice = useStockPrice();

  // Initialize state after component mounts
  useEffect(() => {
    setWatchlists([{ id: '1', name: 'Default', stocks: [] }]);
    setSelectedWatchlist('1');
    setIsClient(true);
  }, []);

  // Handle time updates separately
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString());
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const addWatchlist = (name: string) => {
    setWatchlists(prev => [...prev, {
      id: generateId(),
      name,
      stocks: []
    }]);
  };

  const currentWatchlist = watchlists.find(w => w.id === selectedWatchlist);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Hi, Harshad</h1>
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
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const name = formData.get('name') as string;
              if (name) addWatchlist(name);
            }}>
              <Input name="name" placeholder="Watchlist name" className="mb-4" />
              <Button type="submit">Create</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px,1fr]">
        <div className="space-y-4">
          {watchlists.length > 0 && (
            <Select value={selectedWatchlist} onValueChange={setSelectedWatchlist}>
              <SelectTrigger>
                <SelectValue placeholder="Select a watchlist" />
              </SelectTrigger>
              <SelectContent>
                {watchlists.map(watchlist => (
                  <SelectItem key={watchlist.id} value={watchlist.id}>
                    {watchlist.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {currentWatchlist && (
            <div className="p-4 border rounded-lg">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">{currentWatchlist.name}</h2>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Bitcoin (BTCUSDT)</div>
                      <div className="text-sm text-muted-foreground">Binance</div>
                    </div>
                    <div className="font-mono text-lg">
                      {bitcoinPrice 
                        ? `$${bitcoinPrice.toFixed(2)}` 
                        : 'Loading...'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-6">
          <div className="grid gap-4 p-6 border rounded-lg">
            <h2 className="font-semibold">Market Overview</h2>
            <div className="grid gap-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bitcoin Price</span>
                <span className="font-mono">
                  {bitcoinPrice 
                    ? `$${bitcoinPrice.toFixed(2)}` 
                    : 'Loading...'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span>{currentTime}</span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-6 border rounded-lg">
            <h2 className="font-semibold">Price History</h2>
            <div style={{ width: "100%", height: "500px" }}>
                    <TradingViewChart/>
      </div>
          </div>
        </div>
      </div>
    </div>
  );
}