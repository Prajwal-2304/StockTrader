'use server'
import db from "@/db/index"

export async function addStockToWatchlist(wid:number,ticker:string){
    try{
        const res=db.watchlistStock.create({
            data:{
                watchlistid:wid,
                stockTicker:ticker
            }
        })
        return res;
    }catch(err){
        console.log(err)
    }
}