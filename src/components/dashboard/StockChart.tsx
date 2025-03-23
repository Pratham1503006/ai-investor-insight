import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import GlassCard from "@/components/common/GlassCard";
import { Button } from "@/components/ui/button";

interface ChartData {
  name: string;
  value: number;
}

interface StockChartProps {
  title: string;
  symbol: string;
  currentPrice: number;
  changePercent: number;
  changeAmount: number;
  data: ChartData[];
  color: string;
}

const TimeRangeButton: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <Button
    variant={active ? "default" : "outline"}
    size="sm"
    onClick={onClick}
    className={`px-3 py-1 h-8 text-xs ${active ? "" : "bg-transparent"}`}
  >
    {children}
  </Button>
);

const StockChart: React.FC<StockChartProps> = ({
  title,
  symbol,
  currentPrice,
  changePercent,
  changeAmount,
  data,
  color,
}) => {
  const [timeRange, setTimeRange] = useState<"1D" | "1W" | "1M" | "3M" | "1Y" | "ALL">("1M");
  const isPositive = changePercent >= 0;
  const navigate = useNavigate();

  // Calculate starting value for reference line
  const startingValue = data.length > 0 ? data[0].value : 0;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 border border-border p-2 rounded-md text-xs">
          <p className="font-medium">{`${payload[0].payload.name}`}</p>
          <p className="text-foreground">{`Price: $${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };

  const handleDoubleClick = () => {
    navigate(`/Charts/AAPL`);
  };

  return (
    <GlassCard className="h-full">
      <div onClick={handleDoubleClick}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-medium">{title}</h3>
              <div className="text-sm text-muted-foreground">{symbol}</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-medium">${currentPrice.toFixed(2)}</div>
              <div 
                className={`text-sm ${isPositive ? 'text-finance-green' : 'text-finance-red'}`}
              >
                {isPositive ? '+' : ''}{changePercent.toFixed(2)}% (${Math.abs(changeAmount).toFixed(2)})
              </div>
            </div>
          </div>
          
          <div className="h-[200px] mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.1)" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  domain={['dataMin - 5', 'dataMax + 5']} 
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  dx={-10}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={startingValue} stroke="#888" strokeDasharray="3 3" />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, strokeWidth: 1 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-between gap-2 mt-auto">
            {(["1D", "1W", "1M", "3M", "1Y", "ALL"] as const).map((range) => (
              <TimeRangeButton
                key={range}
                active={timeRange === range}
                onClick={() => setTimeRange(range)}
              >
                {range}
              </TimeRangeButton>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default StockChart;