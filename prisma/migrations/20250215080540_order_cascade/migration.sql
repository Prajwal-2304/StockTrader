-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_stockticker_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_stockticker_fkey" FOREIGN KEY ("stockticker") REFERENCES "Stock"("ticker") ON DELETE CASCADE ON UPDATE CASCADE;
