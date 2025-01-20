import { useState, useEffect } from 'react';

import { NewsItem } from '../types/watchlist';

export function useNewsData(symbol: string) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchNews = async () => {
          try {
              const apikey = process.env.NEXT_PUBLIC_API;
              if (!apikey) {
                  return;
              }

              const response = await fetch(
                  `https://finnhub.io/api/v1/news?category=crypto&token=${apikey}`
              );
              const data = await response.json();
              console.log("news is ",news)
              const newsToShow = symbol 
                  ? data.filter((item: NewsItem) => {
                      const normalizedRelated = decodeURIComponent(item.related || '').toLowerCase();
                      const normalizedSymbol = symbol.toLowerCase().replace('usdt', '');
                      return normalizedRelated.includes(normalizedSymbol);
                  }).slice(0, 5)
                  : data.slice(0, 9);
              
              const cleanedNews = newsToShow.map((item: NewsItem) => ({
                  ...item,
                  headline: decodeURIComponent(item.headline),
                  summary: decodeURIComponent(item.summary),
                  related: decodeURIComponent(item.related || ''),
                  url: decodeURIComponent(item.url)
              }));
              
              setNews(cleanedNews);
              setLoading(false);
          } catch (error) {
              setLoading(false);
          }
      };

      fetchNews();
  }, [symbol]);

  return { news, loading };
}