import React, { useState } from "react";
import GlassCard from "@/components/common/GlassCard";
import { ArrowUpRight, ArrowDownRight, DollarSign, Percent, X, Plus } from "lucide-react";

interface PortfolioSummaryProps {
  totalValue: number;
  changePercent: number;
  changeAmount: number;
  portfolioAllocation: {
    name: string;
    value: number;
    color: string;
  }[];
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({
  totalValue,
  changePercent,
  changeAmount,
  portfolioAllocation,
}) => {
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [newStock, setNewStock] = useState("");
  const isPositive = changePercent >= 0;

  const handleAddToWatchlist = () => {
    const stock = prompt("Enter stock symbol to watch (e.g., AAPL):");
    if (stock && !watchlist.includes(stock.toUpperCase())) {
      setWatchlist([...watchlist, stock.toUpperCase()]);
    }
  };

  const removeFromWatchlist = (stockToRemove: string) => {
    setWatchlist(watchlist.filter(stock => stock !== stockToRemove));
  };

  return (
    <GlassCard className="h-full backdrop-blur-lg bg-opacity-20">
      <div className="flex flex-col h-full p-6 gap-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-primary">Portfolio Overview</h2>
         
            
        </div>

        {/* Watchlist Section */}
        {watchlist.length > 0 && (
          <div className="bg-secondary/10 rounded-xl p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Watchlist</h3>
            <div className="flex flex-wrap gap-3">
              {watchlist.map((stock, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full"
                >
                  <span className="text-sm font-medium">{stock}</span>
                  <button
                    onClick={() => removeFromWatchlist(stock)}
                    className="text-red-400/80 hover:text-red-500 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Value Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <ArrowUpRight size={16} />
              <span className="text-sm">Total Value</span>
            </div>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
          </div>
          
          <div className={`p-4 rounded-xl ${isPositive ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              <span className="text-sm">24h Change</span>
            </div>
            <div className={`text-2xl font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Allocation Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Asset Allocation</h3>
          <div className="flex h-3 w-full rounded-full overflow-hidden bg-secondary/20">
            {portfolioAllocation.map((item, index) => (
              <div 
                key={index}
                className="h-full transition-all duration-500"
                style={{ 
                  width: `${item.value}%`,
                  backgroundColor: item.color
                }}
              />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {portfolioAllocation.map((item, index) => (
              <div key={index} className="flex items-center text-sm">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-muted-foreground">{item.name}</span>
                <span className="ml-auto font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-2 gap-4 mt-auto">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <DollarSign size={16} />
              <span className="text-sm">Annual ROI</span>
            </div>
            <div className="text-xl font-bold text-blue-400">+12.8%</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Percent size={16} />
              <span className="text-sm">Dividends</span>
            </div>
            <div className="text-xl font-bold text-purple-400">$1,245</div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default PortfolioSummary;