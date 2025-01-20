import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { useBulkPrices } from '@/app/hooks/usePriceServices';
import { useMemo } from 'react';

// Types
interface Holding {
    symbol: string;  // Changed from name to symbol to match with WebSocket data
    amount: number;
    initialValue: number;  // Added to track initial investment per coin
  }
  
  interface PortfolioData {
    holdings: Holding[];
    investedAmount: number;
  }
  
  export default function App() {
    // Mock data - replace with actual data from your backend
    const portfolioData: PortfolioData = {
      investedAmount: 20000,
      holdings: [
        { symbol: 'BTCUSDT', amount: 0.5, initialValue: 15000 },
        { symbol: 'SOLUSDT', amount: 15, initialValue: 5000 },
        { symbol: 'XRPUSDT', amount: 1000, initialValue: 3000 },
        { symbol: 'BNBUSDT', amount: 5, initialValue: 2000 },
      ],
    };
  
    // Get symbols for price subscription
    const symbols = portfolioData.holdings.map(holding => holding.symbol);
    
    // Get real-time prices
    const prices = useBulkPrices(symbols);
  
    // Calculate portfolio metrics
    const portfolioMetrics = useMemo(() => {
      let totalValue = 0;
  
      const updatedHoldings = portfolioData.holdings.map(holding => {
        const currentPrice = prices[holding.symbol] || 0;
        const currentValue = holding.amount * currentPrice;
        totalValue += currentValue;
  
        return {
          ...holding,
          currentPrice,
          currentValue,
        };
      });
  
      const profitLoss = totalValue - portfolioData.investedAmount;
      const profitLossPercentage = (profitLoss / portfolioData.investedAmount) * 100;
  
      return {
        totalValue,
        profitLoss,
        profitLossPercentage,
        holdings: updatedHoldings,
      };
    }, [prices, portfolioData]);
  
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold">Portfolio Overview</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Value</p>
                  <p className="text-2xl font-bold">
                    ${portfolioMetrics.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                <Wallet className="w-8 h-8 text-blue-500" />
              </div>
            </div>
  
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Invested Amount</p>
                  <p className="text-2xl font-bold">${portfolioData.investedAmount.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </div>
  
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Profit/Loss</p>
                  <div className="flex items-center gap-2">
                    <p className={`text-2xl font-bold ${portfolioMetrics.profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      ${Math.abs(portfolioMetrics.profitLoss).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <span className={`text-sm ${portfolioMetrics.profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      ({portfolioMetrics.profitLossPercentage.toFixed(2)}%)
                    </span>
                  </div>
                </div>
                {portfolioMetrics.profitLoss >= 0 ? (
                  <TrendingUp className="w-8 h-8 text-green-500" />
                ) : (
                  <TrendingDown className="w-8 h-8 text-red-500" />
                )}
              </div>
            </div>
          </div>
  
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Holdings</h2>
              <div className="space-y-4">
                {portfolioMetrics.holdings.map((holding, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{holding.symbol}</p>
                      <p className="text-sm text-gray-600">{holding.amount} tokens</p>
                      <p className="text-sm text-gray-600">
                        Current Price: ${holding.currentPrice?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        ${holding.currentValue?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <p className={`text-sm ${holding.currentValue > holding.initialValue ? 'text-green-500' : 'text-red-500'}`}>
                        {((holding.currentValue - holding.initialValue) / holding.initialValue * 100).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }