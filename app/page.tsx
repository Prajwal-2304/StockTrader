"use client"
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, BarChart2, Globe, Star } from 'lucide-react'
import SignupModal from '@/components/Signupmodal'
import { useState } from 'react'
import TermsAndConditions from '@/components/terms'
import { useRouter } from 'next/navigation'
import { Slider } from '@radix-ui/react-slider'
import { LoginModal } from '@/components/loginmodal'


export default function LandingPage() {
  const [showTerms, setShowTerms] = useState(false)
  const router = useRouter();

  const openTermsWindow = () => {
    setShowTerms(true)
  }

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
          <LoginModal />
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative">
          <Image
            src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Stock market background"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
            className='z-0 pointer-events-none'
          />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Master the Market with AlphaWealth
                </h1>
                <p className="mx-auto max-w-[700px] text-white md:text-xl">
                  Advanced tools, real-time data, and expert insights to help you make informed investment decisions.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
                <Button variant="outline" className="bg-white/20 backdrop-blur-sm border-white text-white hover:bg-white/30" 
                onClick={()=>{router.push("/about")}}>Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50 dark:bg-blue-950">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-700 dark:text-blue-300">Our Features</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white/50 backdrop-blur-md dark:bg-gray-800/50">
                <CardHeader>
                  <CardTitle className="text-blue-600 dark:text-blue-400">Real-Time Data</CardTitle>
                  <ArrowUpRight className="w-4 h-4 ml-2 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">Access up-to-the-minute stock prices, market trends, and financial news.</p>
                </CardContent>
              </Card>
              <Card className="bg-white/50 backdrop-blur-md dark:bg-gray-800/50">
                <CardHeader>
                  <CardTitle className="text-blue-600 dark:text-blue-400">Advanced Analytics</CardTitle>
                  <BarChart2 className="w-4 h-4 ml-2 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">Powerful tools for technical analysis, portfolio tracking, and risk assessment.</p>
                </CardContent>
              </Card>
              <Card className="bg-white/50 backdrop-blur-md dark:bg-gray-800/50">
                <CardHeader>
                  <CardTitle className="text-blue-600 dark:text-blue-400">Global Markets</CardTitle>
                  <Globe className="w-4 h-4 ml-2 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">Trade and monitor stocks from markets around the world, all in one place.</p>
                </CardContent>
                <Slider/>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-100 to-white dark:from-blue-950 dark:to-gray-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-700 dark:text-blue-300">Customer Testimonials</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Harshad Mehta", role: "Day Trader", content: "AlphaWealth has revolutionized my trading strategy. The real-time data and advanced analytics have given me a significant edge in the market." },
                { name: "Rakesh", role: "Long-term Investor", content: "As a long-term investor, I appreciate the comprehensive market insights provided by AlphaWealth. It's helped me make more informed decisions for my portfolio." },
                { name: "Bhaskar", role: "Financial Advisor", content: "I recommend AlphaWealth to all my clients. The platform's user-friendly interface and powerful tools cater to both novice and experienced investors." }
              ].map((testimonial, index) => (
                <Card key={index} className="bg-white/50 backdrop-blur-md dark:bg-gray-800/50">
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-700 dark:text-blue-300">Start Trading Today</h2>
                <p className="mx-auto max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of successful investors. Sign up now and start your journey to financial success.
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
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white/80 backdrop-blur-md dark:bg-gray-950/80">
        <p className="text-xs text-gray-600 dark:text-gray-400">© 2023 AlphaWealth. All rights reserved.</p>
      </footer>
      {showTerms && <TermsAndConditions onClose={() => setShowTerms(false)} />}
    </div>
  )
}


