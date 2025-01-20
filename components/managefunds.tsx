"use client"
import React, { useState } from 'react';
import {  Button  } from './ui/button';
import { Input } from './ui/input';
import { Card,CardContent } from './ui/card';
import { Plus, Minus,DollarSign } from 'lucide-react';
import { addFunds } from '@/app/actions/funds';
import { useToast } from '@/hooks/use-toast';
import { withdrawFunds,getBalance} from '@/app/actions/funds';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function ManageFundsSection() {
  const [amount, setAmount] = useState("")
  const [balance, setBalance] = useState(0)
  const { toast } = useToast()
  const session=useSession()
  useEffect(() => {
    fetchBalance()
  }, [])

  const fetchBalance = async () => {  
    try {
      const res = await getBalance(session.data?.user.id) // Assuming user ID is 1
      if (res) {
        setBalance(res)
      } else {
        toast({
          variant: "destructive",
          description: "Failed to fetch balance",
        })
      }
    } catch (error) {
      console.error("Error fetching balance:", error)
      toast({
        variant: "destructive",
        description: "An error occurred while fetching balance",
      })
    }
  }

  const handleAddFunds = async () => {
    try {
      const res = await addFunds(1, Number.parseFloat(amount))
      if (res.success) {
        toast({
          description: `Amount $${amount} deposited successfully`,
        })
        fetchBalance() // Refresh balance after adding funds
        setAmount("") // Clear input field
      } else {
        toast({
          variant: "destructive",
          description: "Failed to add amount",
        })
      }
    } catch (error) {
      console.error("Error adding funds:", error)
      toast({
        variant: "destructive",
        description: "An error occurred while adding funds",
      })
    }
  }

  const handleWithdrawFunds = async () => {
    try {
      const res = await withdrawFunds(1, Number.parseFloat(amount))
      if (res.success) {
        toast({
          description: `Amount $${amount} withdrawn successfully`,
        })
        fetchBalance() // Refresh balance after withdrawal
        setAmount("") // Clear input field
      } else {
        toast({
          variant: "destructive",
          description: "Failed to withdraw amount",
        })
      }
    } catch (error) {
      console.error("Error withdrawing funds:", error)
      toast({
        variant: "destructive",
        description: "An error occurred while withdrawing funds",
      })
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Manage Funds</h1>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Current Balance:</span>
            <span className="text-lg font-bold flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              {balance.toFixed(2)}
            </span>
          </div>

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
            <Button onClick={handleAddFunds} className="w-full" disabled={!amount || Number.parseFloat(amount) <= 0}>
              <Plus className="w-4 h-4 mr-2" />
              Add Funds
            </Button>
            <Button
              onClick={handleWithdrawFunds}
              variant="outline"
              className="w-full"
              disabled={!amount || Number.parseFloat(amount) <= 0 || Number.parseFloat(amount) > balance}
            >
              <Minus className="w-4 h-4 mr-2" />
              Withdraw
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
