import React, { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/common/GlassCard";
import PortfolioSummary from "@/components/dashboard/PortfolioSummary";
import StockChart from "@/components/dashboard/StockChart";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, ChevronDown, Filter, User, Plus, X, Search } from "lucide-react";

interface StockData {
  symbol: string;
  name: string;
  data: { name: string; value: number }[];
  currentPrice: number;
  changePercent: number;
  changeAmount: number;
  quantity: number;
  color: string;
  ws?: WebSocket;
}

const generateChartData = (length: number, volatility: number) => {
  const result = [];
  let value = 100 + Math.random() * 50;
  const startValue = value;
  
  for (let i = 0; i < length; i++) {
    const change = (Math.random() - 0.5) * volatility;
    value = Math.max(50, value + change);
    
    result.push({
      name: new Date(Date.now() - (length - i) * 60000).toLocaleTimeString(),
      value: parseFloat(value.toFixed(2))
    });
  }

  const change = value - startValue;
  return {
    data: result,
    currentPrice: value,
    changePercent: (change / startValue) * 100,
    changeAmount: change
  };
};

const Dashboard: React.FC = () => {
  const [watchlist, setWatchlist] = useState<StockData[]>([]);
  const [formData, setFormData] = useState({ symbol: "", quantity: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const [inputError, setInputError] = useState("");

  const calculatePortfolioValue = useCallback(() => {
    return watchlist.reduce((total, stock) => 
      total + (stock.currentPrice * stock.quantity), 0
    );
  }, [watchlist]);

  const updateStockData = useCallback((symbol: string, newPrice: number) => {
    setWatchlist(prev => prev.map(stock => {
      if (stock.symbol === symbol) {
        const change = newPrice - stock.currentPrice;
        return {
          ...stock,
          currentPrice: newPrice,
          changePercent: (change / stock.currentPrice) * 100,
          changeAmount: change
        };
      }
      return stock;
    }));
  }, []);

  const simulateWebSocket = useCallback((symbol: string) => {
    const ws = new WebSocket(`wss://mock-stream.com/${symbol}`);
    let interval = setInterval(() => {
      const mockPrice = Math.random() * 200 + 50; // Generate random price between 50-250
      updateStockData(symbol, mockPrice);
    }, 2000);

    ws.onclose = () => clearInterval(interval);

    return ws;
  }, [updateStockData]);

  useEffect(() => {
    return () => {
      // Cleanup all WebSocket connections
      watchlist.forEach(stock => stock.ws?.close());
    };
  }, [watchlist]);

  const handleAddStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.symbol.trim() || !formData.quantity.trim()) {
      setInputError("Please enter a stock symbol and quantity");
      return;
    }

    const existing = watchlist.find(s => s.symbol === formData.symbol.toUpperCase());
    if (existing) {
      setInputError("Stock already in watchlist");
      return;
    }

    const mockData = generateChartData(12, 10);
    const ws = simulateWebSocket(formData.symbol.toUpperCase());

    const newStock = {
      symbol: formData.symbol.toUpperCase(),
      name: formData.symbol.toUpperCase(),
      quantity: parseInt(formData.quantity),
      ...mockData,
      color: mockData.changePercent >= 0 ? '#4ade80' : '#f87171',
      ws
    };

    setWatchlist(prev => [...prev, newStock]);
    setFormData({ symbol: "", quantity: "" });
    setInputError("");
    setShowAddForm(false);
  };

  const removeStock = (symbol: string) => {
    setWatchlist(prev => {
      const removedStock = prev.find(s => s.symbol === symbol);
      removedStock?.ws?.close();
      return prev.filter(s => s.symbol !== symbol);
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gradient-to-b from-background to-accent/20">
        <div className="container mx-auto px-4 py-6">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-1 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Investment Dashboard
              </h1>
              <p className="text-muted-foreground">
                Your comprehensive financial overview
              </p>
            </div>
            <div className="flex items-center gap-4 self-end md:self-auto">
              <Button variant="outline" size="sm" className="rounded-full">
                <Bell size={18} />
              </Button>
              <Button variant="outline" size="sm">
                <User size={16} className="mr-2" />
                Account
                <ChevronDown size={14} className="ml-2" />
              </Button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-1">
              <PortfolioSummary
                totalValue={calculatePortfolioValue()} changePercent={0} changeAmount={0} portfolioAllocation={[]}              />
            </div>
            
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview">
                <div className="flex justify-between items-center mb-4">
                  <TabsList className="bg-background/50 backdrop-blur-sm">
                    <TabsTrigger value="overview" className="px-4 py-2">Overview</TabsTrigger>
                    <TabsTrigger value="stocks" className="px-4 py-2">Stocks</TabsTrigger>
                  </TabsList>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter size={14} className="mr-2" />
                      Filter
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => setShowAddForm(true)}
                      className="bg-primary/90 hover:bg-primary"
                    >
                      <Plus size={14} className="mr-2" />
                      Add Stock
                    </Button>
                  </div>
                </div>

                {/* Add Stock Form Overlay */}
                {showAddForm && (
                  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <GlassCard className="w-96 p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Add New Stock</h3>
                        <button 
                          onClick={() => {
                            setShowAddForm(false);
                            setInputError("");
                          }}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      
                      <form onSubmit={handleAddStock}>
                        <div className="space-y-4">
                          <div className="relative">
                            <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                            <input
                              type="text"
                              value={formData.symbol}
                              onChange={(e) => {
                                setFormData(p => ({...p, symbol: e.target.value}));
                                setInputError("");
                              }}
                              placeholder="Enter stock symbol (e.g., AAPL)"
                              className="w-full pl-9 pr-4 py-2.5 bg-background/50 rounded-lg border border-border focus:ring-2 focus:ring-primary focus:border-transparent"
                              autoFocus
                            />
                          </div>
                          <input
                            type="number"
                            value={formData.quantity}
                            onChange={(e) => {
                              setFormData(p => ({...p, quantity: e.target.value}));
                              setInputError("");
                            }}
                            placeholder="Quantity"
                            className="w-full p-2.5 border rounded-lg"
                          />
                          {inputError && (
                            <p className="text-sm text-red-400">{inputError}</p>
                          )}
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="outline"
                              type="button"
                              onClick={() => {
                                setShowAddForm(false);
                                setInputError("");
                              }}
                            >
                              Cancel
                            </Button>
                            <Button type="submit">Add Stock</Button>
                          </div>
                        </div>
                      </form>
                    </GlassCard>
                  </div>
                )}

                {/* Overview Tab Content */}
                <TabsContent value="overview">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <StockChart
                      symbol="SPY"
                      currentPrice={458.89}
                      changePercent={1.24}
                      changeAmount={5.62}
                      data={generateChartData(12, 10).data}
                      color="#0055FF" title={""}                    />
                    <StockChart
                      symbol="AAPL"
                      changePercent={-0.83}
                      changeAmount={-1.48}
                      data={generateChartData(12, 15).data}
                      color="#FF5A5F" title={""} currentPrice={0}                    />
                  </div>
                </TabsContent>
                
                {/* Stocks Tab Content */}
                <TabsContent value="stocks">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {watchlist.map((stock) => (
                      <div key={stock.symbol} className="relative group">
                        <button
                          onClick={() => removeStock(stock.symbol)}
                          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-background/80 hover:bg-accent transition-opacity opacity-0 group-hover:opacity-100"
                        >
                          <X size={16} className="text-muted-foreground" />
                        </button>
                        <StockChart
                          title={stock.name}
                          symbol={stock.symbol}
                          currentPrice={stock.currentPrice}
                          changePercent={stock.changePercent}
                          changeAmount={stock.changeAmount}
                          data={stock.data}
                          color={stock.color}
                        />
                      </div>
                    ))}
                    
                    {watchlist.length === 0 && (
                      <div className="col-span-full h-64 flex flex-col items-center justify-center text-center p-6 rounded-xl border-2 border-dashed border-accent/30">
                        <div className="mb-4 p-3 bg-accent/10 rounded-full">
                          <Plus className="text-accent" size={32} />
                        </div>
                        <h3 className="text-lg font-medium mb-2">No Stocks Added</h3>
                        <p className="text-muted-foreground text-sm">
                          Click "Add Stock" to start monitoring your investments
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const StockCard = React.memo(({ stock, onRemove }: { 
  stock: StockData, 
  onRemove: (symbol: string) => void 
}) => {
  return (
    <GlassCard className="relative group">
      <button 
        onClick={() => onRemove(stock.symbol)}
        className="absolute top-2 right-2 p-1 hover:bg-accent rounded-full transition-opacity"
      >
        <X size={16} />
      </button>
      <StockChart
        symbol={stock.symbol}
        currentPrice={stock.currentPrice}
        changePercent={stock.changePercent}
        data={stock.data} title={""} changeAmount={0} color={""}      />
      <div className="p-4">
        <h4 className="font-semibold">{stock.symbol}</h4>
        <p>Shares: {stock.quantity}</p>
        <p>Value: ${(stock.currentPrice * stock.quantity).toFixed(2)}</p>
      </div>
    </GlassCard>
  );
});

export default Dashboard;