"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowUpRight, LineChart, Briefcase, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import SignupModal from "@/components/Signupmodal"
import TermsAndConditions from "@/components/terms"
import { NavHeader } from "@/components/navbar"

export default function LandingPage() {
  const [showTerms, setShowTerms] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const message = searchParams.get("message")

  const openTermsWindow = () => {
    setShowTerms(true)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavHeader />
      <main className="flex-1 pt-16">
        {message && (
          <Alert className="max-w-md mx-auto mt-4 mb-4">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-gray-800 dark:text-gray-100">
                  Master the Market with AlphaWealth
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-300 md:text-xl">
                  Advanced trading tools, real-time data, and expert insights to help you make informed investment
                  decisions.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
                <Button
                  variant="outline"
                  className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    router.push("/about")
                  }}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-700 dark:text-blue-300">
              Our Features
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-gray-50 dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className="text-blue-600 dark:text-blue-400">Advanced Trading</CardTitle>
                  <LineChart className="w-4 h-4 ml-2 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Professional-grade tools for technical analysis and trading execution.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className="text-blue-600 dark:text-blue-400">Portfolio Management</CardTitle>
                  <Briefcase className="w-4 h-4 ml-2 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Comprehensive tools for tracking and optimizing your investment portfolio.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className="text-blue-600 dark:text-blue-400">Market Analysis</CardTitle>
                  <ArrowUpRight className="w-4 h-4 ml-2 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Deep market insights and analysis tools for better decision making.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-700 dark:text-blue-300">
              Testimonials
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "John Doe",
                  role: "Professional Trader",
                  content:
                    "AlphaWealth's trading tools have significantly improved my trading performance. The platform is intuitive and powerful.",
                },
                {
                  name: "Jane Smith",
                  role: "Investment Manager",
                  content:
                    "The portfolio management features are exceptional. It's made managing multiple portfolios much more efficient.",
                },
                {
                  name: "Alex Johnson",
                  role: "Day Trader",
                  content:
                    "The real-time analytics and market insights have been invaluable for my day trading strategy.",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-blue-600 dark:text-blue-400 flex items-center">
                      <Star className="w-4 h-4 mr-2 fill-current" />
                      {testimonial.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-700 dark:text-blue-300">
                  Start Trading Today
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of successful traders. Sign up now and start your journey to financial success.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <SignupModal />
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  By signing up, you agree to our{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto text-xs underline underline-offset-2 hover:text-blue-600 dark:hover:text-blue-400"
                    onClick={openTermsWindow}
                  >
                    Terms & Conditions
                  </Button>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white dark:bg-gray-950">
        <p className="text-xs text-gray-600 dark:text-gray-400">© 2023 AlphaWealth. All rights reserved.</p>
      </footer>
      {showTerms && <TermsAndConditions onClose={() => setShowTerms(false)} />}
    </div>
  )
}

