import Link from "next/link"
import { BarChart2 } from "lucide-react"
import { LoginModal } from "./loginmodal"

export function NavHeader() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center fixed w-full z-10 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <Link className="flex items-center justify-center" href="/">
        <BarChart2 className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
        <span className="font-bold text-blue-600 dark:text-blue-400">AlphaWealth</span>
      </Link>
      <div className="ml-auto flex items-center gap-4 sm:gap-6">
        <nav className="flex items-center gap-4 sm:gap-6">
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
        <LoginModal />
      </div>
    </header>
  )
}

