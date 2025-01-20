'use server'

import db from "@/db/index"
import { revalidatePath } from "next/cache";

export async function buyStock(
  userId: number,
  stockTicker: string,
  quantity: number,
  price: number
) {
  try {
    // Start transaction
    return await db.$transaction(async (tx) => {
      // Get user's balance
      const user = await tx.users.findUnique({
        where: { id: userId },
        select: { balance: true }
      });

      if (!user) throw new Error('User not found');

      const totalCost = quantity * price;
      if (user.balance < totalCost) {
        throw new Error('Insufficient balance');
      }

      // Create order
      await tx.order.create({
        data: {
          userId,
          stockticker: stockTicker,
          type: 'Buy',
          quantity,
          date: new Date(),
        }
      });

      // Update user's balance
      await tx.users.update({
        where: { id: userId },
        data: { balance: user.balance - totalCost }
      });

      // Update or create portfolio entry
      const existingPortfolio = await tx.portfolio.findFirst({
        where: { userid: userId }
      });

      const portfolioId = existingPortfolio?.id || 
        (await tx.portfolio.create({
          data: { userid: userId }
        })).id;

      const existingPosition = await tx.portfolioStock.findFirst({
        where: {
          portfolioid: portfolioId,
          stockticker: stockTicker
        }
      });

      if (existingPosition) {
        await tx.portfolioStock.update({
          where: { id: existingPosition.id },
          data: {
            quantity: existingPosition.quantity + quantity,
            investedAmt: existingPosition.investedAmt + totalCost
          }
        });
      } else {
        await tx.portfolioStock.create({
          data: {
            portfolioid: portfolioId,
            stockticker: stockTicker,
            quantity,
            investedAmt: totalCost
          }
        });
      }

      revalidatePath('/dashboard');
      return { success: true };
    });
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Transaction failed' 
    };
  }
}

export async function sellStock(
  userId: number,
  stockTicker: string,
  quantity: number,
  price: number
) {
  try {
    return await db.$transaction(async (tx) => {
      // Get user's portfolio
      const portfolio = await tx.portfolio.findFirst({
        where: { userid: userId },
        include: {
          stocks: {
            where: { stockticker: stockTicker }
          }
        }
      });

      if (!portfolio || !portfolio.stocks[0]) {
        throw new Error('Stock not found in portfolio');
      }

      const position = portfolio.stocks[0];
      if (position.quantity < quantity) {
        throw new Error('Insufficient stock quantity');
      }

      // Create sell order
      await tx.order.create({
        data: {
          userId,
          stockticker: stockTicker,
          type: 'Sell',
          quantity,
          date: new Date(),
        }
      });

      const totalValue = quantity * price;

      // Update user's balance
      await tx.users.update({
        where: { id: userId },
        data: {
          balance: { increment: totalValue }
        }
      });

      // Update portfolio
      if (position.quantity === quantity) {
        await tx.portfolioStock.delete({
          where: { id: position.id }
        });
      } else {
        const soldInvestedAmount = (position.investedAmt / position.quantity) * quantity;
        await tx.portfolioStock.update({
          where: { id: position.id },
          data: {
            quantity: position.quantity - quantity,
            investedAmt: position.investedAmt - soldInvestedAmount
          }
        });
      }

      revalidatePath('/dashboard');
      return { success: true };
    });
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Transaction failed' 
    };
  }
}