"use client"
import { redirect, useRouter } from "next/navigation"
import React from "react"

interface MessageDisplayProps{
    message:string
}

export const MessageDisplay: React.FC<MessageDisplayProps> = ({ message}) => {
    const router = useRouter()
    setTimeout(redirect("/"),5000)
    return (
      <div className={`p-4 rounded-md bg-primary text-primary-foreground `}>
        <p>{message}</p>
      </div>
    )
  }