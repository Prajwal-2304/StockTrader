import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2, Users, Shield, Award } from 'lucide-react'

export default function AboutPage() {
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
            src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="About Background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="container px-4 md:px-6 relative z-10">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-8 text-white">
              About AlphaWealth
            </h1>
            <p className="max-w-[700px] text-white md:text-xl mb-12">
              AlphaWealth is a cutting-edge platform designed to empower investors with advanced tools and insights. Our mission is to democratize stock market investing by providing professional-grade analytics to individual investors.
            </p>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white/80 backdrop-blur-md dark:bg-gray-800/80">
                <CardHeader>
                  <CardTitle className="text-blue-600 dark:text-blue-400">Our Team</CardTitle>
                  <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our team consists of experienced financial analysts, data scientists, and software engineers working together to bring you the best stock market tools.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-md dark:bg-gray-800/80">
                <CardHeader>
                  <CardTitle className="text-blue-600 dark:text-blue-400">Security</CardTitle>
                  <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    We prioritize the security of your data and investments. Our platform uses state-of-the-art encryption and follows strict security protocols to protect your information.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-md dark:bg-gray-800/80">
                <CardHeader>
                  <CardTitle className="text-blue-600 dark:text-blue-400">Our Achievements</CardTitle>
                  <Award className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    AlphaWealth has been recognized for its innovative approach to stock market analysis, winning several industry awards for our AI-driven predictions and portfolio management tools.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold mb-4 text-white">Ready to start your investment journey?</h2>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">Join AlphaWealth Today</Button>
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

