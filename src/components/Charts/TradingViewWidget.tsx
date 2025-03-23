import React, { memo, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../layout/Navbar';

const TradingViewWidget: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "autosize": true,
        "symbol": "NASDAQ:${symbol}",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "allow_symbol_change": true,
        "save_image": false,
        "support_host": "https://www.tradingview.com"
      }`;
    if (container.current) {
      container.current.appendChild(script);
    }
  }, [symbol]);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <div className="tradingview-widget-container h-full w-full" ref={container}>
          <div className="tradingview-widget-container__widget h-full w-full"></div> 
          </div>
        </div>
      </div>
  );
};

export default memo(TradingViewWidget);