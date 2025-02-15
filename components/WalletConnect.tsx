"use client"

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";

export default function WalletButton() {
    const [isClient, setIsClient] = useState(false)
    const router=useRouter();
    const {connected}=useWallet();
    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(()=>{
        if(connected){
            router.push('/token/token-creator')
        }
    })

    if (!isClient) {
        return null
    }

    return (
        <WalletMultiButton />
    )
}