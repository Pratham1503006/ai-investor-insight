import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import TaxCalculate from "./components/taxation/TaxCalculator";
import TradingViewWidget from "./components/Charts/TradingViewWidget";
import AIAdvisor from "./pages/AIAdvisor";
import NewsFeed from "./components/news/News";
import ProtectedRoute from "./components/layout/ProtectedRoutes";
import OrderComp from "./components/order/OrderComp";
import AccountComp from "./components/accounts/AccountComp";
import HomePage from "./pages/HomePage";
import StockTaxCalculator from "./components/taxation/TaxCalculator";
import AIAdvisorPage from "./pages/AIAdvisor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/taxation" element={<ProtectedRoute><StockTaxCalculator /></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><AccountComp /></ProtectedRoute>} />
          <Route path="/order" element={<ProtectedRoute><OrderComp /></ProtectedRoute>} />
          <Route path="/ai-advisor" element={<ProtectedRoute><AIAdvisorPage /></ProtectedRoute>} />
          <Route path="/news" element={<ProtectedRoute><NewsFeed /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;