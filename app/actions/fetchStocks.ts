'use server'
import db from '@/db/index';

export async function fetchAllStocks(){
    try{
        const res=await db.stock.findMany({
            select:{
                id:true,
                ticker:true,
                name:true,
            }
        })
        return res;
    }catch(err){
        console.log("error is ",err);
        return err;
    }
}

export async function fetchWatchListStocks(watchlistId:number){
    try{
        const stocks= await db.watchlistStock.findMany({
            where:{id:watchlistId},
            include:{
                stocks:{select:{
                    ticker:true,
                    name:true,
                    chain:true
                }}
            }
        })
        return stocks;
    }catch(err){
        console.log(err)
        return err;
    }
}