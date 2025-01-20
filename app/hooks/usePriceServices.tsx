'use client '
import { useState, useEffect, useRef } from 'react';

interface PriceData {
  [key: string]: number;
}

// Singleton WebSocket instance
let globalWs: WebSocket | null = null;
let subscribers = new Set<(data: any) => void>();
let pendingSubscriptions: { type: string; symbol: string }[] = [];

const setupWebSocket = (apikey: string) => {
  if (globalWs?.readyState === WebSocket.OPEN) return globalWs;

  globalWs = new WebSocket(`wss://ws.finnhub.io?token=${apikey}`);

  globalWs.onopen = () => {
    // Send all pending subscriptions once connected
    pendingSubscriptions.forEach(sub => {
      globalWs?.send(JSON.stringify(sub));
    });
    pendingSubscriptions = [];
  };

  globalWs.onmessage = (event) => {
    const data = JSON.parse(event.data);
    subscribers.forEach(callback => callback(data));
  };

  return globalWs;
};

const subscribe = (ws: WebSocket, symbol: string) => {
  const subscription = { 
    type: 'subscribe', 
    symbol: `BINANCE:${symbol}USDT`
  };

  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(subscription));
  } else {
    pendingSubscriptions.push(subscription);
  }
};

const unsubscribe = (ws: WebSocket, symbol: string) => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ 
      type: 'unsubscribe', 
      symbol: `BINANCE:${symbol}USDT` 
    }));
  }
};

export function useBulkPrices(symbols: string[]) {
  const [prices, setPrices] = useState<PriceData>({});
  
  useEffect(() => {
    const apikey = process.env.NEXT_PUBLIC_API;
    if (!apikey || symbols.length === 0) return;

    const ws = setupWebSocket(apikey);

    const handleMessage = (data: any) => {
      if (data.type === 'trade') {
        data.data.forEach((trade: { s: string; p: number }) => {
          const symbol = trade.s.replace('BINANCE:', '');
          if (symbols.includes(symbol)) {
            setPrices(prev => ({
              ...prev,
              [symbol]: trade.p
            }));
          }
        });
      }
    };

    subscribers.add(handleMessage);

    // Subscribe to all symbols
    symbols.forEach(symbol => subscribe(ws, symbol));

    return () => {
      subscribers.delete(handleMessage);
      
      // Only unsubscribe and close if no other subscribers
      if (subscribers.size === 0 && ws.readyState === WebSocket.OPEN) {
        symbols.forEach(symbol => unsubscribe(ws, symbol));
        ws.close();
        globalWs = null;
      }
    };
  }, [symbols.join(',')]);

  return prices;
}

export function useSinglePrice(symbol: string) {
  const [price, setPrice] = useState<number | null>(null);
  console.log("recieved ",symbol)
  useEffect(() => {
    const apikey = process.env.NEXT_PUBLIC_API;
    if (!apikey || !symbol) return;

    const ws = setupWebSocket(apikey);

    const handleMessage = (data: any) => {
      if (data.type === 'trade') {
        data.data.forEach((trade: { s: string; p: number }) => {
          if (trade.s === `BINANCE:${symbol}`) {
            setPrice(trade.p);
          }
        });
      }
    };

    subscribers.add(handleMessage);

    // Subscribe to the symbol
    subscribe(ws, symbol);

    return () => {
      subscribers.delete(handleMessage);
      
      // Only unsubscribe and close if no other subscribers
      if (subscribers.size === 0 && ws.readyState === WebSocket.OPEN) {
        unsubscribe(ws, symbol);
        ws.close();
        globalWs = null;
      }
    };
  }, [symbol]);

  return price;
}