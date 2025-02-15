import React from "react"
import { Rocket } from "lucide-react"
import { ModeToggle } from "./ModeToggle"
import WalletButton from "./WalletConnect"
import { ArrowLeft } from "lucide-react"
export default function Appbar() {
    return (
      <header className="px-4 py-2 sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="flex flex-1">
            <a className="flex items-center space-x-2" href="http://localhost:3000/dashboard">
              <ArrowLeft className="h-5 w-5 text-primary" />
              <span className="font-bold bg-gradient-to-r from-primary to-teal-500 bg-clip-text text-transparent">
                Alpha Wealth
              </span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="flex items-center gap-2">
              <WalletButton />
            </div>
           
          </div>
        </div>
      </header>
    )
  }