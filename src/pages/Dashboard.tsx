
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/common/GlassCard";
import PortfolioSummary from "@/components/dashboard/PortfolioSummary";
import StockChart from "@/components/dashboard/StockChart";
import AIAdvisor from "@/components/dashboard/AIAdvisor";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, ChevronDown, Filter, User, Settings, Search, Plus } from "lucide-react";

// Mock data
const portfolioAllocation = [
  { name: "Stocks", value: 45, color: "#0055FF" },
  { name: "Bonds", value: 25, color: "#00C899" },
  { name: "Cash", value: 15, color: "#FFBD00" },
  { name: "Real Estate", value: 15, color: "#9747FF" },
];

const generateChartData = (length: number, volatility: number) => {
  const result = [];
  let value = 100 + Math.random() * 50;
  
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  for (let i = 0; i < length; i++) {
    const change = (Math.random() - 0.5) * volatility;
    value = Math.max(50, value + change);
    
    result.push({
      name: months[i % 12],
      value: parseFloat(value.toFixed(2))
    });
  }
  
  return result;
};

const stockData = [
  {
    title: "S&P 500",
    symbol: "SPY",
    currentPrice: 458.89,
    changePercent: 1.24,
    changeAmount: 5.62,
    data: generateChartData(12, 10),
    color: "#0055FF",
  },
  {
    title: "Apple Inc.",
    symbol: "AAPL",
    currentPrice: 176.35,
    changePercent: -0.83,
    changeAmount: -1.48,
    data: generateChartData(12, 15),
    color: "#FF5A5F",
  },
];

const watchlistStocks = [
  { name: "Microsoft", symbol: "MSFT", price: 352.78, change: 2.56 },
  { name: "Amazon", symbol: "AMZN", price: 131.24, change: -0.35 },
  { name: "Tesla", symbol: "TSLA", price: 251.12, change: 3.78 },
  { name: "Google", symbol: "GOOGL", price: 121.89, change: 1.02 },
];

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gradient-to-b from-background to-accent/20">
        <div className="container mx-auto px-4 py-6">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back! Here's an overview of your investments
              </p>
            </div>
            <div className="flex items-center gap-4 self-end md:self-auto">
              <div className="relative">
                <Button size="icon" variant="outline">
                  <Bell size={18} />
                </Button>
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-finance-red"></span>
              </div>
              <Button variant="outline" size="sm">
                <User size={16} className="mr-2" />
                Account
                <ChevronDown size={14} className="ml-2" />
              </Button>
            </div>
          </div>
          
          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Portfolio Summary */}
            <div className="lg:col-span-1">
              <PortfolioSummary
                totalValue={185750.62}
                changePercent={1.24}
                changeAmount={2364.12}
                portfolioAllocation={portfolioAllocation}
              />
            </div>
            
            {/* Stock Charts */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="h-full">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="stocks">Stocks</TabsTrigger>
                    <TabsTrigger value="bonds">Bonds</TabsTrigger>
                    <TabsTrigger value="crypto">Crypto</TabsTrigger>
                  </TabsList>
                  <Button variant="outline" size="sm">
                    <Filter size={14} className="mr-2" />
                    Filter
                  </Button>
                </div>
                
                <TabsContent value="overview" className="mt-0 h-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                    {stockData.map((stock, index) => (
                      <StockChart key={index} {...stock} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="stocks" className="mt-0">
                  <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                    Stocks content coming soon
                  </div>
                </TabsContent>
                
                <TabsContent value="bonds" className="mt-0">
                  <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                    Bonds content coming soon
                  </div>
                </TabsContent>
                
                <TabsContent value="crypto" className="mt-0">
                  <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                    Crypto content coming soon
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Watchlist */}
            <div className="lg:col-span-1">
              <GlassCard className="h-full">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium">Watchlist</h3>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Plus size={16} className="mr-1" />
                      Add
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {watchlistStocks.map((stock, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                      >
                        <div>
                          <div className="font-medium">{stock.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {stock.symbol}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            ${stock.price.toFixed(2)}
                          </div>
                          <div
                            className={`text-sm ${
                              stock.change >= 0
                                ? "text-finance-green"
                                : "text-finance-red"
                            }`}
                          >
                            {stock.change >= 0 ? "+" : ""}
                            {stock.change.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <Button variant="outline" className="w-full">
                      View All Watchlist
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </div>
            
            {/* AI Advisor */}
            <div className="lg:col-span-2">
              <AIAdvisor />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
