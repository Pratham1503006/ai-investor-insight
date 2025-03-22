
import React, { useState } from "react";
import GlassCard from "@/components/common/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Send, ArrowRight, Lightbulb } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AISuggestion {
  title: string;
  description: string;
}

const AIAdvisor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI financial advisor. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const suggestions: AISuggestion[] = [
    {
      title: "Portfolio analysis",
      description: "Can you analyze my current portfolio and suggest improvements?",
    },
    {
      title: "Tax optimization",
      description: "How can I optimize my investments for tax efficiency?",
    },
    {
      title: "Market trends",
      description: "What are the current market trends I should be aware of?",
    },
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      let response = "";
      
      if (inputValue.toLowerCase().includes("portfolio")) {
        response = "Based on your current portfolio, I recommend increasing your exposure to technology and renewable energy sectors. These areas show strong growth potential in the current market conditions. Consider allocating 10-15% more to these sectors while maintaining diversification.";
      } else if (inputValue.toLowerCase().includes("tax")) {
        response = "To optimize your investments for tax efficiency, consider maxing out your tax-advantaged accounts first (401k, IRA, HSA). For taxable accounts, look into tax-loss harvesting opportunities and holding investments for at least a year to qualify for long-term capital gains rates, which are typically lower than short-term rates.";
      } else if (inputValue.toLowerCase().includes("market") || inputValue.toLowerCase().includes("trend")) {
        response = "Current market trends show strength in AI and clean energy sectors. Inflation concerns are moderating, and the Fed may pivot on interest rates in the coming quarters. Consider positioning your portfolio to benefit from these macroeconomic shifts while maintaining appropriate risk management.";
      } else {
        response = "Thank you for your question. Based on your financial profile, I recommend focusing on diversification across asset classes. Remember that long-term investing typically outperforms short-term trading strategies for retail investors. Would you like more specific advice on a particular investment area?";
      }
      
      const aiMessage: Message = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const applySuggestion = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <GlassCard className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">AI Financial Advisor</h3>
        <div className="flex items-center text-primary text-sm">
          <Sparkles size={14} className="mr-1" />
          <span>Powered by AI</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-3 ${
                message.role === "user"
                  ? "bg-primary text-white"
                  : "bg-secondary"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs opacity-70 mt-1 text-right">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl p-4 bg-secondary">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {messages.length <= 1 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="bg-secondary hover:bg-secondary/80 rounded-xl p-3 text-left transition-colors group"
              onClick={() => applySuggestion(suggestion.description)}
            >
              <div className="flex items-center gap-2 mb-1 text-sm font-medium">
                <Lightbulb size={14} />
                {suggestion.title}
              </div>
              <p className="text-xs text-muted-foreground">{suggestion.description}</p>
              <ArrowRight size={14} className="mt-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      )}
      
      <div className="flex items-center gap-2">
        <Input
          placeholder="Ask for financial advice..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button 
          size="icon" 
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || isLoading}
        >
          <Send size={18} />
        </Button>
      </div>
    </GlassCard>
  );
};

export default AIAdvisor;
