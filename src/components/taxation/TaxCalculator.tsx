import React, { useState } from "react";
import Navbar from "../layout/Navbar";
import axios from "axios";

interface Transaction {
  type: "buy" | "sell";
  stock: string;
  date: string;
  price: number;
  quantity: number;
}

const TAX_RATES = {
  shortTerm: 0.3,
  longTerm: 0.15,
  dividend: 0.2,
};

const API_KEY = "QBX69922SH08I7I9";

const StockTaxCalculator: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [dividends, setDividends] = useState<number>(0);
  const [taxResult, setTaxResult] = useState<{ shortTerm: number; longTerm: number; dividendTax: number } | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: "buy" as "buy" | "sell",
    stock: "",
    date: "",
    quantity: "",
  });
  const [priceLoading, setPriceLoading] = useState(false);
  const [priceError, setPriceError] = useState("");

  const fetchHistoricalPrice = async (symbol: string, date: string) => {
    try {
      setPriceLoading(true);
      setPriceError("");
      
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`
      );

      const timeSeries = response.data["Time Series (Daily)"];
      if (!timeSeries) throw new Error("Invalid stock symbol");

      // Try to find the exact date or nearest previous trading day
      let targetDate = new Date(date);
      let attempts = 0;
      
      while (attempts < 30) { // Search up to 30 days back
        const dateString = targetDate.toISOString().split('T')[0];
        
        if (timeSeries[dateString]) {
          return parseFloat(timeSeries[dateString]["4. close"]);
        }
        
        targetDate.setDate(targetDate.getDate() - 1);
        attempts++;
      }

      throw new Error("No price data found for nearby dates");
    } catch (error) {
      setPriceError("Failed to fetch historical price. Check date and symbol.");
      throw error;
    } finally {
      setPriceLoading(false);
    }
  };

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.stock || !formData.date || !formData.quantity) return;

    try {
      // Check if date is in the future
      const transactionDate = new Date(formData.date);
      if (transactionDate > new Date()) {
        throw new Error("Transaction date cannot be in the future");
      }

      const price = await fetchHistoricalPrice(formData.stock, formData.date);
      
      const newTransaction = {
        type: formData.type,
        stock: formData.stock.toUpperCase(),
        date: formData.date,
        price: price,
        quantity: parseInt(formData.quantity),
      };

      setTransactions([...transactions, newTransaction]);
      setFormData({ type: "buy", stock: "", date: "", quantity: "" });
      setShowForm(false);
    } catch (error) {
      // Error handled in fetchHistoricalPrice
    }
  };

  const calculateTax = () => {
    let shortTermGain = 0, longTermGain = 0;
    const buyTransactions: Transaction[] = [];

    transactions.forEach((tx) => {
      if (tx.type === "buy") {
        buyTransactions.push(tx);
      } else if (tx.type === "sell") {
        let remainingShares = tx.quantity;
        for (const buyTx of buyTransactions) {
          if (remainingShares <= 0) break;

          const heldDays = (new Date(tx.date).getTime() - new Date(buyTx.date).getTime()) / (1000 * 3600 * 24);
          const sharesToSell = Math.min(buyTx.quantity, remainingShares);
          const profit = (tx.price - buyTx.price) * sharesToSell;

          if (heldDays < 365) {
            shortTermGain += profit;
          } else {
            longTermGain += profit;
          }

          remainingShares -= sharesToSell;
        }
      }
    });

    const shortTermTax = shortTermGain * TAX_RATES.shortTerm;
    const longTermTax = longTermGain * TAX_RATES.longTerm;
    const dividendTax = dividends * TAX_RATES.dividend;

    setTaxResult({ shortTerm: shortTermTax, longTerm: longTermTax, dividendTax });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Stock Tax Calculator</h2>

          {/* Modified Add Transaction Form */}
          {showForm && (
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold mb-4">Add New Transaction</h3>
              <form onSubmit={handleAddTransaction} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as "buy" | "sell" })}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="buy">Buy</option>
                      <option value="sell">Sell</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock Symbol</label>
                    <input
                      type="text"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      className="w-full p-2 border rounded-md"
                      placeholder="e.g. AAPL"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <input
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full p-2 border rounded-md"
                      placeholder="Number of shares"
                    />
                  </div>
                </div>
                {priceError && <p className="text-red-500 text-sm">{priceError}</p>}
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                    disabled={priceLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                    disabled={priceLoading}
                  >
                    {priceLoading ? "Fetching Price..." : "Add Transaction"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Rest of the component remains the same */}
          <button
            onClick={() => setShowForm(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            ➕ Add Transaction
          </button>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📈 Dividend Income ($)
            </label>
            <input 
              type="number" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setDividends(parseFloat(e.target.value) || 0)} 
              placeholder="Enter dividend amount"
            />
          </div>

          <button 
            onClick={calculateTax} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors mt-6"
          >
            🧮 Calculate Taxes
          </button>

          {taxResult && (
            <div className="mt-8 p-6 bg-indigo-50 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">📑 Tax Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                  <span className="text-gray-600">Short-Term Tax:</span>
                  <span className="font-medium text-red-600">
                    ${taxResult.shortTerm.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                  <span className="text-gray-600">Long-Term Tax:</span>
                  <span className="font-medium text-amber-600">
                    ${taxResult.longTerm.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                  <span className="text-gray-600">Dividend Tax:</span>
                  <span className="font-medium text-emerald-600">
                    ${taxResult.dividendTax.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">📋 Transaction History</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Stock</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Qty</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map((tx, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-3 text-sm">{tx.date}</td>
                    <td className="px-4 py-3 font-medium">{tx.stock}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${tx.type === 'buy' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                        {tx.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{tx.quantity}</td>
                    <td className="px-4 py-3 text-sm">${tx.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {transactions.length === 0 && (
            <div className="text-center py-6 text-gray-400">
              No transactions recorded yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockTaxCalculator;