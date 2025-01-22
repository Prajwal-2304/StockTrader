import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2, Users, Shield, Award } from 'lucide-react'
import { NavHeader } from '@/components/navbar'

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavHeader />
      <main className="flex-1 pt-16">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-8 text-gray-800 dark:text-gray-100">
              About AlphaWealth
            </h1>
            <p className="max-w-[700px] text-gray-600 dark:text-gray-300 md:text-xl mb-12">
              AlphaWealth is a cutting-edge trading platform designed to empower investors with professional-grade tools
              and insights. Our mission is to democratize trading by providing advanced analytics and easy-to-use
              features for both traditional and crypto markets.
            </p>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-blue-600 dark:text-blue-400">Our Team</CardTitle>
                  <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our team consists of experienced traders, financial analysts, and software engineers working
                    together to bring you the best trading experience.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-blue-600 dark:text-blue-400">Security</CardTitle>
                  <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    We prioritize the security of your assets and data. Our platform uses state-of-the-art encryption
                    and follows strict security protocols.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-blue-600 dark:text-blue-400">Our Achievements</CardTitle>
                  <Award className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    AlphaWealth has been recognized for its innovative approach to trading and analytics, winning
                    several industry awards for our platform.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Ready to start trading?</h2>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Join AlphaWealth Today
              </Button>
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

