'use client'

import { useState, useEffect } from 'react'
import { NewsItem } from '../types/watchlist'

export function useNewsData(sectors: string[] | undefined) {
    // const [news, setNews] = useState<NewsItem[]>([])
    // const [loading, setLoading] = useState(true)
    // const [error, setError] = useState<string | null>(null)
  
    // useEffect(() => {
    //   async function fetchNews() {
    //     setLoading(true)
    //     setError(null)
    //     try {
    //       const apiKey = process.env.NEXT_PUBLIC_API
    //       if (!apiKey) {
    //         throw new Error('API key is not defined')
    //       }
  
    //       const response = await fetch(`https://finnhub.io/api/v1/news?category=general&token=${apiKey}`)
    //       if (!response.ok) {
    //         throw new Error('Failed to fetch news')
    //       }
  
    //       const data: NewsItem[] = await response.json()
  
    //       // Filter news based on the sectors provided in props
    //       if (sectors && sectors.length > 0) {
    //         const lowercaseSectors = sectors.map(sector => sector.toLowerCase())
    //         const filteredNews = data.filter((item) =>
    //           lowercaseSectors.some(sector => 
    //             item.headline.toLowerCase().includes(sector) ||
    //             item.summary.toLowerCase().includes(sector) ||
    //             item.related.toLowerCase().includes(sector)
    //           )
    //         )
    //         setNews(filteredNews)
    //       } else {
    //         setNews(data)
    //       }
    //     } catch (error) {
    //       console.error('Error fetching news:', error)
    //       setError('Error fetching news')
    //       setNews([])
    //     }
    //     setLoading(false)
    //   }
  
    //   fetchNews()
    // }, [sectors])
  
    // return { news, loading, error }
  }
