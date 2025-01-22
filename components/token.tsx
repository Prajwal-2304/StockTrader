import { Rocket, ArrowRight, Shield, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function TokenLaunchSection() {
  const router=useRouter()
  const handleClick=()=>{
      router.push("http://localhost:3001")
  }
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          Launch Your Token
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Create and deploy your own token on the Solana blockchain with our easy-to-use platform.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <Rocket className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
            <CardTitle>Easy Launch</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              Launch your token in minutes with our simple step-by-step process.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
            <CardTitle>Secure & Reliable</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              Built on Solana with industry-standard security practices.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <Coins className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
            <CardTitle>Token Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">Comprehensive tools to manage your token post-launch.</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center mt-8">
        
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={()=>handleClick()}>
            Launch Your Token
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
       
      </div>
    </div>
  )
}
