import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

export default function PortfolioSection() {
  // Mock data - replace with actual data from your backend
  const portfolioData = {
    totalValue: 25000,
    investedAmount: 20000,
    openingBalance: 15000,
    holdings: [
      { name: 'Bitcoin', amount: 0.5, value: 15000 },
      { name: 'Solana', amount: 15, value: 5000 },
      { name: 'Ripple', amount: 1000, value: 3000 },
      { name: 'Binance Coin', amount: 5, value: 2000 },
    ],
  };

  const profitLoss = portfolioData.totalValue - portfolioData.investedAmount;
  const profitLossPercentage = (profitLoss / portfolioData.investedAmount) * 100;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Portfolio Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">${portfolioData.totalValue.toLocaleString()}</p>
              </div>
              <Wallet className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Invested Amount</p>
                <p className="text-2xl font-bold">${portfolioData.investedAmount.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Profit/Loss</p>
                <div className="flex items-center gap-2">
                  <p className={`text-2xl font-bold ${profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    ${Math.abs(profitLoss).toLocaleString()}
                  </p>
                  <span className={`text-sm ${profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    ({profitLossPercentage.toFixed(2)}%)
                  </span>
                </div>
              </div>
              {profitLoss >= 0 ? (
                <TrendingUp className="w-8 h-8 text-green-500" />
              ) : (
                <TrendingDown className="w-8 h-8 text-red-500" />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Holdings</h2>
          <div className="space-y-4">
            {portfolioData.holdings.map((holding, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{holding.name}</p>
                  <p className="text-sm text-muted-foreground">{holding.amount} tokens</p>
                </div>
                <p className="font-bold">${holding.value.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}