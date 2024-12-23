'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BarChart2, TrendingUp, TrendingDown, Search, Bell, User, Briefcase, DollarSign } from 'lucide-react'

const mockData = {
  indices: [
    { name: 'NIFTY 50', value: 23753.45, change: 165.95, changePercent: 0.70 },
    { name: 'SENSEX', value: 78540.17, change: 498.38, changePercent: 0.64 }
  ],
  watchlist: [
    { symbol: 'RELIANCE', change: 17.00, changePercent: 1.41, price: 1222.30 },
    { symbol: 'HDFCBANK', change: 28.95, changePercent: 1.63, price: 1801.00 },
    { symbol: 'TCS', change: -12.00, changePercent: -0.29, price: 4158.30 },
    { symbol: 'ICICIBANK', change: 8.40, changePercent: 0.65, price: 1296.80 },
    { symbol: 'PNB', change: 0.61, changePercent: 0.61, price: 101.38 },
    { symbol: 'BHEL', change: 5.20, changePercent: 2.21, price: 240.45 }
  ]
}

export default function Dashboard() {
  const [data, setData] = useState(mockData)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setData(mockData)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center space-x-4">
            <Link className="flex items-center space-x-2" href="/">
              <BarChart2 className="h-6 w-6 text-blue-600" />
              <span className="font-bold">AlphaWealth</span>
            </Link>
            {/* Market Indices */}
            <div className="hidden md:flex items-center space-x-4">
              {data.indices.map((index) => (
                <div key={index.name} className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{index.name}</span>
                  <span className="text-sm font-bold">{index.value.toLocaleString()}</span>
                  <span className={`text-xs ${index.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {index.change >= 0 ? '+' : ''}{index.change} ({index.changePercent}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Bell className="h-5 w-5 text-gray-500" />
            <User className="h-5 w-5 text-gray-500" />
            <span className="font-medium">HBJ331</span>
          </div>
        </div>
      </header>

      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Hi, John</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {/* Watchlist Section */}
          <div className="col-span-1">
            <Card>
              <CardHeader className="space-y-0 pb-4">
                <CardTitle className="text-sm font-medium">Watchlist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Search className="h-4 w-4 text-gray-500" />
                    <Input 
                      placeholder="Search stocks..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-8"
                    />
                  </div>
                  <div className="space-y-4">
                    {data.watchlist.map((stock) => (
                      <div key={stock.symbol} className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{stock.symbol}</p>
                          <p className={`text-sm ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%
                          </p>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="text-sm font-medium leading-none">{stock.price.toLocaleString()}</p>
                          <p className={`text-sm ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {stock.change >= 0 ? '+' : ''}{stock.change}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-2">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Equity Section */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-4 w-4" />
                      <span>Equity</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Margin available</span>
                      <span className="font-medium">₹0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Margins used</span>
                      <span className="font-medium">₹0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Opening balance</span>
                      <span className="font-medium">₹0</span>
                    </div>
                    <Button variant="link" className="text-blue-600 p-0 h-auto">
                      View statement
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Commodity Section */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4" />
                      <span>Commodity</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Margin available</span>
                      <span className="font-medium">₹0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Margins used</span>
                      <span className="font-medium">₹0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Opening balance</span>
                      <span className="font-medium">₹0</span>
                    </div>
                    <Button variant="link" className="text-blue-600 p-0 h-auto">
                      View statement
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Empty State */}
            <Card className="mt-4">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Briefcase className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-sm text-gray-500 text-center mb-4">
                  You don't have any stocks in your DEMAT yet. Get started with absolutely free equity investments.
                </p>
                <Button>Start investing</Button>
              </CardContent>
            </Card>

            {/* Market Overview */}
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-4">Market overview</h3>
              {/* Market overview content would go here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

