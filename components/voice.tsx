"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Mic, MicOff } from "lucide-react"
import { recognizeSpeech } from "@/lib/azureSpeechService"

interface VoiceInputProps {
  onResult: (text: string) => void
}

export function VoiceInput({ onResult }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false)
  const [feedback, setFeedback] = useState("")

  const toggleListening = async () => {
    if (!isListening) {
      setIsListening(true)
      setFeedback("Listening...")
      try {
        const result = await recognizeSpeech()
        setFeedback("Processing...")
        onResult(result)
      } catch (error) {
        console.error("Speech recognition error:", error)
        setFeedback("Error occurred. Please try again.")
      } finally {
        setIsListening(false)
        setTimeout(() => setFeedback(""), 2000) // Clear feedback after 2 seconds
      }
    } else {
      setIsListening(false)
      setFeedback("")
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Button onClick={toggleListening} variant="outline" className="flex items-center gap-2">
        {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        {isListening ? "Stop Listening" : "Start Voice Input"}
      </Button>
      {feedback && <p className="text-sm text-muted-foreground">{feedback}</p>}
    </div>
  )
}

