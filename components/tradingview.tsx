"use client"
import React, { useEffect, useRef } from "react";

export default function TradingViewChart() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = () => {
        new window.TradingView.widget({
          container_id: containerRef.current.id,
          symbol: "BINANCE:BTCUSDT",
          theme: "light",
          autosize: true,
        });
      };
      containerRef.current.appendChild(script);
    }
  }, []);

  return <div id="tradingview_chart" ref={containerRef} style={{ height: "500px" }} />;
}
