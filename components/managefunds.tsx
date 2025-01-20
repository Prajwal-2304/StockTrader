import React, { useState } from 'react';
import {  Button  } from './ui/button';
import { Input } from './ui/input';
import { Card,CardContent } from './ui/card';
import { Plus, Minus } from 'lucide-react';

export default function ManageFundsSection() {
  const [amount, setAmount] = useState('');

  const handleAddFunds = async () => {
    // Implement your add funds logic here
    console.log('Adding funds:', amount);
  };

  const handleWithdrawFunds = async () => {
    // Implement your withdraw funds logic here
    console.log('Withdrawing funds:', amount);
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Manage Funds</h1>
      
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium">
              Amount (USD)
            </label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={handleAddFunds}
              className="w-full"
              disabled={!amount}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Funds
            </Button>
            <Button
              onClick={handleWithdrawFunds}
              variant="outline"
              className="w-full"
              disabled={!amount}
            >
              <Minus className="w-4 h-4 mr-2" />
              Withdraw
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}