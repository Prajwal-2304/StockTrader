import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2, Briefcase, TrendingUp } from 'lucide-react'

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center fixed w-full z-10 bg-white/80 backdrop-blur-md dark:bg-gray-950/80">
        <Link className="flex items-center justify-center" href="/">
          <BarChart2 className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
          <span className="font-bold text-blue-600 dark:text-blue-400">AlphaWealth</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400" href="/features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400" href="/about">
            About
          </Link>
          <Link className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400" href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 relative">
          <Image
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Features Background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="container px-4 md:px-6 relative z-10">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-8 text-white">
              Our Features
            </h1>
            <div className="grid gap-10 sm:grid-cols-2">
              <Card className="bg-white/80 backdrop-blur-md dark:bg-gray-800/80">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-600 dark:text-blue-400">Customized Portfolio Suggestion</CardTitle>
                  <Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our advanced AI algorithms analyze your risk tolerance, investment goals, and market conditions to create a personalized portfolio suggestion. We take into account factors such as:
                  </p>
                  <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                    <li>Your financial goals and timeline</li>
                    <li>Risk tolerance assessment</li>
                    <li>Current market trends and economic indicators</li>
                    <li>Diversification across sectors and asset classes</li>
                  </ul>
                  <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white">Get Your Custom Portfolio</Button>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-md dark:bg-gray-800/80">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-600 dark:text-blue-400">Stock Price Prediction</CardTitle>
                  <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Leverage the power of machine learning to get insights into potential future stock prices. Our prediction model considers:
                  </p>
                  <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                    <li>Historical price data and trading volumes</li>
                    <li>Company financial reports and news sentiment analysis</li>
                    <li>Market indices and sector performance</li>
                    <li>Macroeconomic indicators</li>
                  </ul>
                  <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white">Try Stock Price Prediction</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white/80 backdrop-blur-md dark:bg-gray-950/80">
        <p className="text-xs text-gray-600 dark:text-gray-400">© 2023 AlphaWealth. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:text-blue-600 dark:hover:text-blue-400" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:text-blue-600 dark:hover:text-blue-400" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

