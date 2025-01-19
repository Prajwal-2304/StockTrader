export interface Stock {
    id:number
    ticker: string
    name: string
    type: string
  }
  
  export interface Watchlist {
    id: number
    name: string
    stocks: Stock[]
  }
  
  export interface NewsItem {
    category: string
    datetime: number
    headline: string
    id: number
    related: string
    source: string
    summary: string
    url: string
  }
  
  export interface PortfolioSummary {
    totalValue: number
    todayChange: number
    todayChangePercent: number
  }
  
  