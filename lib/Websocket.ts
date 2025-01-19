class WebSocketManagerClass {
    private ws: WebSocket | null = null
    private subscribers: Set<(prices: Record<string, number>) => void> = new Set()
    private prices: Record<string, number> = {}
    private subscriptions: Set<string> = new Set()
  
    initialize() {
      if (this.ws) return
  
      const apiKey = process.env.NEXT_PUBLIC_API
      if (!apiKey) {
        console.error("API key not found")
        return
      }
  
      this.ws = new WebSocket(`wss://ws.finnhub.io?token=${apiKey}`)
  
      this.ws.onopen = () => {
        console.log("WebSocket connected")
        // Resubscribe to all symbols
        this.subscriptions.forEach(symbol => {
          this.subscribe(symbol)
        })
      }
  
      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (data.type === "trade") {
          data.data.forEach((trade: { s: string; p: number }) => {
            this.prices[trade.s] = trade.p
          })
          this.notifySubscribers()
        }
      }
  
      this.ws.onerror = (error) => {
        console.error("WebSocket error:", error)
      }
  
      this.ws.onclose = () => {
        console.log("WebSocket disconnected")
        this.ws = null
        // Attempt to reconnect after a delay
        setTimeout(() => this.initialize(), 5000)
      }
    }
  
    subscribe(symbol: string) {
      if (!this.subscriptions.has(symbol)) {
        this.subscriptions.add(symbol)
        if (this.ws?.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify({ type: "subscribe", symbol }))
        }
      }
    }
  
    unsubscribe(symbol: string) {
      if (this.subscriptions.has(symbol)) {
        this.subscriptions.delete(symbol)
        if (this.ws?.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify({ type: "unsubscribe", symbol }))
        }
      }
    }
  
    cleanup() {
      if (this.ws) {
        this.subscriptions.clear()
        this.ws.close()
        this.ws = null
      }
    }
  
    addSubscriber(callback: (prices: Record<string, number>) => void) {
      this.subscribers.add(callback)
      // Immediately send current prices to new subscriber
      callback(this.prices)
    }
  
    removeSubscriber(callback: (prices: Record<string, number>) => void) {
      this.subscribers.delete(callback)
    }
  
    private notifySubscribers() {
      this.subscribers.forEach(callback => callback(this.prices))
    }
  }
  
  export const WebSocketManager = new WebSocketManagerClass()
  
  