"use client"
import React, { useRef, useEffect } from 'react';

interface TradingViewChartProps {
  symbol: string; // Define the symbol prop here
}

const TradingViewChart: React.FC<TradingViewChartProps> = ({ symbol }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current && typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = () => {
        new window.TradingView.widget({
          container_id: containerRef.current.id,
          symbol: `BINANCE:${symbol}`, // Use the symbol prop here
          theme: "light",
          autosize: true,
        });
      };
      containerRef.current.appendChild(script);
    }
  }, [symbol]); // Ensure it re-renders when symbol changes

  return <div id="tradingview_chart" ref={containerRef} style={{ height: "500px" }} />;
};

export default TradingViewChart;
