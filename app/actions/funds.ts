'use server'
import { revalidatePath } from "next/cache";
import db from "@/db/index"
export async function addFunds(userId: number, amount: number) {
    try {
      if (amount <= 0) {
        throw new Error('Amount must be positive');
      }
  
      await db.users.update({
        where: { id: userId },
        data: {
          balance: {
            increment: amount
          }
        }
      });
  
      revalidatePath('/dashboard');
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to add funds' 
      };
    }
  }
  
  export async function withdrawFunds(userId: number, amount: number) {
    try {
      if (amount <= 0) {
        throw new Error('Amount must be positive');
      }
  
      const user = await db.users.findUnique({
        where: { id: userId },
        select: { balance: true }
      });
  
      if (!user) {
        throw new Error('User not found');
      }
  
      if (user.balance < amount) {
        throw new Error('Insufficient balance');
      }
  
      await db.users.update({
        where: { id: userId },
        data: {
          balance: {
            decrement: amount
          }
        }
      });
  
      revalidatePath('/dashboard');
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to withdraw funds' 
      };
    }
  }

  export async function getBalance(userid:number){
    console.log("got ",userid)
    try{
      const res=await db.users.findUnique({
        where:{id:userid},
        select:{balance:true}
      })
    
      return {success:true,balance:res?.balance}
    }catch(error){
      return {success:false,error:error}
    }
  }