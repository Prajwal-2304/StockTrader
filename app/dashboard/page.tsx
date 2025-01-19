'use client'
import { useState, useEffect } from 'react';
import { Plus, TrendingUp, Newspaper } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import TradingViewChart from '@/components/tradingview';
import { useNewsData } from '@/app/hooks/news';
import { useBulkPrices,useSinglePrice } from '../hooks/usePriceServices';

interface Watchlist {
  id: string;
  name: string;
  stocks: string[];
}

const cryptoList = [
  { id: 51, ticker: "ETHUSDT", name: "Ethereum", type: "cryptocurrency", holdings: 1.2 },
  { id: 52, ticker: "BTCUSDT", name: "Bitcoin", type: "cryptocurrency", holdings: 0.5 },
  { id: 53, ticker: "BNBUSDT", name: "Binance Coin", type: "cryptocurrency", holdings: 10 },
  { id: 54, ticker: "SOLUSDT", name: "Solana", type: "cryptocurrency", holdings: 25 },
  { id: 55, ticker: "XRPUSDT", name: "XRP", type: "cryptocurrency", holdings: 1000 },
  { id: 56, ticker: "ADAUSDT", name: "Cardano", type: "cryptocurrency", holdings: 500 },
  { id: 57, ticker: "DOGEUSDT", name: "Dogecoin", type: "cryptocurrency", holdings: 2000 },
  { id: 58, ticker: "PEPEUSDT", name: "Pepe Coin", type: "cryptocurrency", holdings: 100000 }
];

const generateId = () => {
  return Date.now().toString();
};

export default function Dashboard() {
  // All hooks must be called unconditionally at the top level
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [selectedWatchlist, setSelectedWatchlist] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isClient, setIsClient] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<typeof cryptoList[0] | null>(null);
  
  // Get prices for all cryptocurrencies
  const symbols = cryptoList.map(crypto => crypto.ticker);
  const prices = useBulkPrices(symbols);
  
  // Always call useSinglePrice with a default value if no crypto is selected
  const singlePrice = useSinglePrice(selectedCrypto?.ticker || symbols[0]);
  const { news, loading: newsLoading } = useNewsData("");

  // Calculate total portfolio value
  const totalPortfolioValue = Object.entries(prices).reduce((total, [ticker, price]) => {
    const crypto = cryptoList.find(c => c.ticker === ticker);
    if (crypto && price) {
      return total + (price * crypto.holdings);
    }
    return total;
  }, 0);

  // Initialize state after component mounts
  useEffect(() => {
    setWatchlists([{ id: '1', name: 'Default', stocks: [] }]);
    setSelectedWatchlist('1');
    setIsClient(true);
  }, []);

  // Handle time updates
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

  if (!isClient) {
    return <div>Loading...</div>;
  }

  // Render different views based on selectedCrypto
  const renderCryptoDetail = () => {
    if (!selectedCrypto) return null;

    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => setSelectedCrypto(null)}
              className="mr-4"
            >
              ← Back
            </Button>
            <h1 className="text-2xl font-bold">
              {selectedCrypto.name} Dashboard
            </h1>
          </div>
          <Select value={selectedWatchlist} onValueChange={setSelectedWatchlist}>
            <SelectTrigger className="w-[200px]">
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
        </div>

        <div className="grid gap-6">
          <div className="grid gap-4 p-6 border rounded-lg">
            <h2 className="font-semibold">Market Overview</h2>
            <div className="grid gap-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {selectedCrypto.name} Price
                </span>
                <span className="font-mono">
                  {singlePrice 
                    ? `$${singlePrice.toFixed(2)}` 
                    : 'Loading...'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Holdings</span>
                <span className="font-mono">
                  {selectedCrypto.holdings} {selectedCrypto.ticker.replace('USDT', '')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Value</span>
                <span className="font-mono">
                  ${singlePrice 
                    ? (singlePrice * selectedCrypto.holdings).toFixed(2)
                    : '...'}
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
              <TradingViewChart symbol={selectedCrypto.ticker}/>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDashboard = () => {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Crypto Dashboard</h1>
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

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Portfolio Summary</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Total Value</div>
                <div className="text-2xl font-mono">${totalPortfolioValue.toFixed(2)}</div>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Number of Assets</div>
                <div className="text-2xl font-mono">{cryptoList.length}</div>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Last Updated</div>
                <div className="text-2xl font-mono">{currentTime}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {cryptoList.map((crypto) => (
            <Card 
              key={crypto.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedCrypto(crypto)}
            >
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-2">{crypto.name}</h2>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{crypto.ticker}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Price:</span>
                    <span className="font-mono">
                      ${prices[crypto.ticker]?.toFixed(2) || '...'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Holdings:</span>
                    <span className="font-mono">
                      {crypto.holdings} {crypto.ticker.replace('USDT', '')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4">
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Latest Crypto News</h2>
          </div>
          {newsLoading ? (
            <p>Loading news...</p>
          ) : news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {news.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-blue-500"
                    >
                      <h3 className="font-medium mb-2">{item.headline}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.summary}</p>
                      <div className="text-xs text-muted-foreground mt-2">
                        {new Date(item.datetime * 1000).toLocaleDateString()}
                      </div>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p>No news available</p>
          )}
        </div>
      </div>
    );
  };

  return selectedCrypto ? renderCryptoDetail() : renderDashboard();
}