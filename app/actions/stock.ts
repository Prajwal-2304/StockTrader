'use server'

import db from "@/db/index"
import { revalidatePath } from "next/cache";

export async function getStocks() {
  try {
    const stocks = await db.stock.findMany({
      select: {
        ticker: true,
        name: true,
      }
    });
    return { success: true, data: stocks };
  } catch (error) {
    return { success: false, error: 'Failed to fetch stocks' };
  }
}