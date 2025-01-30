'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from 'lucide-react'
import { addStocks } from '../actions/addStocks'

interface AdminWelcomeProps {
  adminName: string
}

export default function AdminWelcome({ adminName }: AdminWelcomeProps) {
  const [isAdding, setIsAdding] = useState(false)

  const handleAddStocks = async () => {
    setIsAdding(true)
    try{
      const res= await addStocks()
    //  console.log("added successfully");
    }catch(err){
      console.log("failed to add");
    }
    setIsAdding(false)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Welcome, {adminName}!</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          As an admin, you have access to add new stocks to the system. 
          Click the button below to get started.
        </p>
        <Button 
          onClick={handleAddStocks} 
          disabled={isAdding}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          {isAdding ? 'Adding Stocks...' : 'Add Stocks'}
        </Button>
      </CardContent>
    </Card>
  )
}

