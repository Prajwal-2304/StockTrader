'use server'

import db from "@/db/index"
import { revalidatePath } from "next/cache";
import { Order, OrderType } from "@prisma/client";
import { addFunds, getBalance, withdrawFunds } from "./funds";
import { number } from "zod";

export async function buyStock(uid:number,ticker:string,price:number,quantity:number,balance:number){
 
  try{
    const investedAmt=quantity*price;
   const res= await db.$transaction(async(tx)=>{
        const pid=await tx.portfolio.findFirst({
          where:{userid:uid},
          select:{id:true}
        })
        console.log(pid)
        if(pid){
          const pstock=await tx.portfolioStock.create({
            data:{
              portfolioid:pid.id,
              stockticker:ticker,
              quantity:quantity,
              investedAmt:quantity*price,
              buyprice:price
            }
          })
          const order =await tx.order.create({
            data:{
              portfolioId:pid.id,
              userId:uid,
              stockticker:ticker,
              type:OrderType.Buy,
              quantity:quantity,
              date:new Date(),
              price:price
            }
          })
          if(order){
            const update=await tx.users.update({
              where:{id:uid},
              data:{balance:(balance-investedAmt)}
            })
          }
      }
 
    })
    revalidatePath("/dashboard")
    return {success:true}
  }catch(err){
    return {success:false,error:err}
  }
}

export async function sellStock(pfStockId:number,quantity:number,price:number,userId:number){
let amount 
  try{
    await db.$transaction(async(tx)=>{
      const details= await tx.portfolioStock.findUnique({
        where:{id:pfStockId},
        select:{buyprice:true,quantity:true}
      }) 
        if(quantity-details?.quantity! ==0){
                const del=await tx.portfolioStock.delete({
                  where:{id:pfStockId}
                })
        }else{  
                const quant=details?.quantity!-quantity
                const update= await tx.portfolioStock.update({
                  where:{id:pfStockId},
                  data:{quantity:quant}
                })
              
        }
        const amt=quantity*price;
        const bal=await getBalance(userId);
        const sel= await tx.users.update({
          where:{id:userId},
          data:{balance:(bal.balance!+amt)}
        })
    })
    revalidatePath("/dashboard")
    return {success:true}
  }catch(error){
      console.log(error)
      return {success:false,error:error}
  }
}