import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldAlert } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
            <ShieldAlert className="w-6 h-6 text-red-600" />
          </div>
          <CardTitle className="mt-4 text-2xl font-bold text-center">Access Denied</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">
            You do not have permission to access this page. Please log in to continue.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          
          <Link href="/" className="text-sm text-center text-gray-600 hover:underline">
            Return to Home Page
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

