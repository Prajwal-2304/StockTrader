"use client"
import { useEffect, useRef, useState } from "react";
import { symbol } from "zod";


export function useStockPrice() {
    const [price, setPrice] = useState<number | null>(null);
    const ws = useRef<WebSocket | null>(null);
    const latestData = useRef<any>(null);
    useEffect(() => {
        const apikey = process.env.NEXT_PUBLIC_API;
        if (!apikey) {
            console.error("API key not found");
            return;
        }

        ws.current = new WebSocket(`wss://ws.finnhub.io?token=${apikey}`);

        ws.current.onopen = () => {
            console.log("Connected");
            ws.current?.send(JSON.stringify({ type: 'subscribe', symbol: 'BINANCE:ETHUSDT' }));
            ws.current?.send(JSON.stringify({ type: 'subscribe', symbol: 'BINANCE:BTCUSDT' }));
            ws.current?.send(JSON.stringify({type:'subscribe',symbol:'BINANCE:BNBUSDT'}))
            ws.current?.send(JSON.stringify({type:'subscribe',symbol:'BINANCE:SOLUSDT'}))
            ws.current?.send(JSON.stringify({type:'subscribe',symbol:'BINANCE:XRPUSDT'}))
            ws.current?.send(JSON.stringify({type:'subscribe',symbol:'BINANCE:ADAUSDT'}))
            ws.current?.send(JSON.stringify({type:'subscribe',symbol:'BINANCE:DOGEUSDT'}))
            ws.current?.send(JSON.stringify({type:'subscribe',symbol:'BINANCE:PEPEUSDT'}))
        };

        const handleMessage = (event: MessageEvent) => {
          const data = JSON.parse(event.data);
          latestData.current = data; // Update the latest data
      };

      // Set up a single interval to log the latest data every 10 seconds
      const intervalId = setInterval(() => {
          if (latestData.current) {
              console.log('Logging data every 10 seconds:', latestData.current);
          }
      }, 10000)

        ws.current.onerror = (error) => {
            console.error("WebSocket error", error);
        };

        ws.current.onclose = () => {
            console.log("WebSocket disconnected");
        };

        ws.current.onmessage=handleMessage;

        return () => {
            if (ws.current) {
                ws.current.send(JSON.stringify({ type: 'unsubscribe', symbol: 'BINANCE:BTCUSDT' }));
                ws.current.close();
            }
        };
    }, []);

    return price;
}