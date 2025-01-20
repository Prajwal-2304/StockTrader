"use server"
import db from "@/db/index"
import { revalidatePath } from "next/cache"

export async function getHoldings(userId:number){
    try{
        const portfolio= await db.portfolio.findFirst({
            where:{userid:userId},
            include:{stocks:{
                select:{
                    id:true,
                    stockticker:true,
                    quantity:true,
                    investedAmt:true,
                    buyprice:true
                }
            }}
        })
    //    console.log("Fetched ",portfolio)
        return portfolio;
    }catch(error){
        console.log(error)
    }
}