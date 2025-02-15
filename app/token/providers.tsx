"use client"

import { ThemeProvider } from "@/components/ThemeProvider"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import '@solana/wallet-adapter-react-ui/styles.css'

export default function Providers({ children }: { 
    children: React.ReactNode 
}) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ConnectionProvider endpoint={process.env.SOLANA_DEVNET_RPC_URL || "https://api.devnet.solana.com"}>
                <WalletProvider wallets={[]} autoConnect>
                    <WalletModalProvider>
                    {children}
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </ThemeProvider>
    )
}