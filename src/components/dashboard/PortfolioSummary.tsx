
import React from "react";
import GlassCard from "@/components/common/GlassCard";
import { ArrowUpRight, ArrowDownRight, DollarSign, Percent } from "lucide-react";

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
  const isPositive = changePercent >= 0;

  return (
    <GlassCard className="h-full">
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-medium mb-6">Portfolio Summary</h3>
        
        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-semibold">
              ${totalValue.toLocaleString()}
            </span>
            <div className={`flex items-center text-sm ${isPositive ? 'text-finance-green' : 'text-finance-red'}`}>
              {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              <span className="ml-1">{isPositive ? '+' : ''}{changePercent.toFixed(2)}%</span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {isPositive ? '+' : ''}${Math.abs(changeAmount).toLocaleString()} today
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3">Allocation</h4>
          <div className="flex h-2 w-full rounded-full overflow-hidden">
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
          <div className="grid grid-cols-2 gap-4 mt-4">
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
        
        <div className="mt-auto grid grid-cols-2 gap-4">
          <div className="bg-secondary rounded-xl p-4">
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <DollarSign size={14} />
              <span>ROI</span>
            </div>
            <div className="text-lg font-medium">+12.8%</div>
          </div>
          <div className="bg-secondary rounded-xl p-4">
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <Percent size={14} />
              <span>Dividends</span>
            </div>
            <div className="text-lg font-medium">$1,245</div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default PortfolioSummary;
