
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import TaxCalculate from "./components/taxation/TaxCalculator";
import TradingViewWidget from "./components/Charts/TradingViewWidget";
import AIAdvisor from "./pages/AIAdvisor";
import NewsFeed from "./components/news/News";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth" element={<Auth />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/taxation" element={<TaxCalculate />} />
          <Route path="/charts/:symbol" element={<TradingViewWidget />} />
          <Route path="/ai-advisor" element={<AIAdvisor />} />
          <Route path="/news" element={<NewsFeed />} />
        </Routes>

      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
