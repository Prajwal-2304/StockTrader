"use client"
import { type } from "os";
import { useEffect,useState,useRef } from "react"
import { symbol } from "zod";




export function useStockPrice(symbols: string[]) {
    const [prices, setPrices] = useState<Record<string, number>>({});
    const ws = useRef<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
  
    useEffect(() => {
      const apiKey = process.env.NEXT_PUBLIC_API;
      if (!apiKey) {
        console.error("API key not found");
        return;
      }
  
      ws.current = new WebSocket(`wss://ws.finnhub.io?token=${apiKey}`);
  
      ws.current.onopen = () => {
        console.log("WebSocket connected");
        setIsConnected(true);
      };
  
      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
  
        if (data.type === "trade") {
          const updatedPrices: Record<string, number> = {};
          data.data.forEach((trade: { s: string; p: number }) => {
            updatedPrices[trade.s] = trade.p;
          });
  
          setPrices((prev) => ({ ...prev, ...updatedPrices }));
        }
      };
  
      ws.current.onerror = (error) => {
        console.error("WebSocket error:", error);
        setIsConnected(false);
      };
  
      ws.current.onclose = () => {
        console.log("WebSocket disconnected");
        setIsConnected(false);
      };
  
      return () => {
        if (ws.current) {
          ws.current.close();
          ws.current = null;
        }
      };
    }, []);
  
    useEffect(() => {
      if (isConnected && ws.current) {
        symbols.forEach((symbol) =>
          ws.current?.send(JSON.stringify({ type: "subscribe", symbol }))
        );
  
        return () => {
          if (ws.current) {
            symbols.forEach((symbol) =>
              ws.current?.send(JSON.stringify({ type: "unsubscribe", symbol }))
            );
          }
        };
      }
    }, [symbols, isConnected]);
  
    return prices;
  }
// Rename the function to follow the custom hook naming convention


// export function useStockPrice() {
//     const [price, setPrice] = useState<number | null>(null);
//     const ws = useRef<WebSocket | null>(null);

//     useEffect(() => {
//         const apikey = process.env.NEXT_PUBLIC_API;
//         if (!apikey) {
//             console.error("API key not found");
//             return;
//         }

//         ws.current = new WebSocket(`wss://ws.finnhub.io?token=${apikey}`);

//         ws.current.onopen = () => {
//             console.log("Connected");
//             ws.current?.send(JSON.stringify({ type: 'subscribe', symbol: 'BINANCE:BTCUSDT' }));
//         };

//         ws.current.onmessage = (event) => {
//             const data = JSON.parse(event.data);
//             if (data.type === 'trade') {
//                 data.data.forEach((trade: { s: string; p: number }) => {
//                     if (trade.s === 'BINANCE:BTCUSDT') {
//                         setPrice(trade.p);
//                     }
//                 });
//             }
//         };

//         ws.current.onerror = (error) => {
//             console.error("WebSocket error", error);
//         };

//         ws.current.onclose = () => {
//             console.log("WebSocket disconnected");
//         };

//         return () => {
//             if (ws.current) {
//                 ws.current.send(JSON.stringify({ type: 'unsubscribe', symbol: 'BINANCE:BTCUSDT' }));
//                 ws.current.close();
//             }
//         };
//     }, []);

//     return price;
// }