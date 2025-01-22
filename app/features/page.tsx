import { Briefcase, TrendingUp, LineChart, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NavHeader } from "@/components/navbar"
import Link from "next/link"

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavHeader />
      <main className="flex-1 pt-16">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-8 text-gray-800 dark:text-gray-100">
              Our Features
            </h1>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-600 dark:text-blue-400">Advanced Trading</CardTitle>
                  <LineChart className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Professional-grade trading tools and analytics for making informed investment decisions.
                  </p>
                  <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                    <li>Real-time market data</li>
                    <li>Technical analysis tools</li>
                    <li>Advanced order types</li>
                    <li>Portfolio tracking</li>
                  </ul>
                  <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white">Start Trading</Button>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-600 dark:text-blue-400">Portfolio Management</CardTitle>
                  <Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Comprehensive portfolio management tools to track and optimize your investments.
                  </p>
                  <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                    <li>Performance analytics</li>
                    <li>Risk assessment</li>
                    <li>Automated rebalancing</li>
                    <li>Custom reporting</li>
                  </ul>
                  <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white">Manage Portfolio</Button>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-600 dark:text-blue-400">Token Launch Platform</CardTitle>
                  <Rocket className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Launch your own tokens with our easy-to-use platform.
                  </p>
                  <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                    <li>Simple token creation</li>
                    <li>Smart contract deployment</li>
                    <li>Token management tools</li>
                    <li>Distribution controls</li>
                  </ul>
                  <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white">Launch Token</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white dark:bg-gray-950">
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

