/*
  Warnings:

  - Added the required column `portfolioId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "portfolioId" INTEGER NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "PortfolioStock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
