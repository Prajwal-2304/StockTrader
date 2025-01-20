'use server'

import db from "@/db/index"
import { revalidatePath } from "next/cache";

export async function createWatchlist(userId: number, name: string) {
  try {
    await db.watchlist.create({
      data: {
        name,
        userId,
      }
    });
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to create watchlist' };
  }
}

export async function addStockToWatchlist(watchlistId: number, stockTicker: string) {
  try {
    await db.watchlistStock.create({
      data: {
        watchlistid: watchlistId,
        stockTicker,
      }
    });
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to add stock to watchlist' };
  }
}

export async function removeStockFromWatchlist(watchlistId: number, stockTicker: string) {
  try {
    await db.watchlistStock.deleteMany({
      where: {
        watchlistid: watchlistId,
        stockTicker,
      }
    });
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to remove stock from watchlist' };
  }
}

export async function deleteWatchlist(watchlistId: number) {
  try {
    await db.watchlist.delete({
      where: {
        id: watchlistId,
      }
    });
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete watchlist' };
  }
}

export async function getUserWatchlists(userId: number) {
  try {
    const watchlists = await db.watchlist.findMany({
      where: {
        userId,
      },
      include: {
        stocks: {
          include: {
            stocks: true,
          }
        }
      }
    });
    return { success: true, data: watchlists };
  } catch (error) {
    return { success: false, error: 'Failed to fetch watchlists' };
  }
}