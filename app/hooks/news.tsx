import { useState, useEffect } from 'react';

interface NewsItem {
    category: string;
    datetime: number;
    headline: string;
    id: number;
    related: string;
    source: string;
    summary: string;
    url: string;
}

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
                console.log(data)
                // If no specific symbol, return all crypto news
                const newsToShow = symbol 
                    ? data.filter((item: NewsItem) => {
                        const normalizedRelated = decodeURIComponent(item.related || '').toLowerCase();
                        const normalizedSymbol = symbol.toLowerCase().replace('usdt', '');
                        return normalizedRelated.includes(normalizedSymbol);
                    }).slice(0, 5)
                    : data.slice(0, 9);
                
                // Clean up the news data
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