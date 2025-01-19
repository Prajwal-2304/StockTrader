'use server'
import { number } from "zod";
import { Stock,Watchlist } from "../types/watchlist"
import db from "@/db/index"

export async function getDefaultWatchlist(): Promise<Watchlist> {
    const defaultStocks: Stock[] = [
      { id: 1, ticker: "AAPL", name: "Apple Inc", type: "technology" },
      { id: 2, ticker: "MSFT", name: "Microsoft Corp", type: "technology" },
      { id: 3, ticker: "GOOGL", name: "Alphabet Inc", type: "technology" },
      { id: 4, ticker: "AMZN", name: "Amazon.com Inc", type: "consumer" },
      { id: 5, ticker: "TSLA", name: "Tesla Inc", type: "automotive" },
      { id: 6, ticker: "NVDA", name: "NVIDIA Corp", type: "technology" },
      { id: 7, ticker: "META", name: "Meta Platforms Inc", type: "technology" },
      { id: 8, ticker: "BRK.A", name: "Berkshire Hathaway Inc", type: "finance" },
    ];
  
    return {
      id: 0,
      name: 'Default Watchlist',
      stocks: defaultStocks,
    };
  }

  export async function fetchAllWatchlist(user:number){
      try{
        const watchlists=await db.watchlist.findMany({
          where:{userId:user},
          include:{
            stocks:{
              include:{stocks:true}
            }
          }
        })
        return watchlists;
      }catch(err){
        console.log(err);
      }
  }

  export async function createWatchlist({name,uid}:{name:string,uid:number}){
    try{
      const res=db.watchlist.create({
        data:{
          userId:uid,
          name:name
        }
      })
      return res;
    }catch(err){
      console.log("addition failed due to ",err)
    }
  }

  export async function fetchWatchlist(wid:number){
    try{
      const wl=await db.watchlist.findUnique({
        where:{id:wid},
        include:{
          stocks:true
        }
      })
      console.log(wl);
      return wl
    }catch(err){
      console.log(err)
    }
  }