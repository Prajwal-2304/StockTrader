/*
  Warnings:

  - Added the required column `buyprice` to the `PortfolioStock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PortfolioStock" ADD COLUMN     "buyprice" DOUBLE PRECISION NOT NULL;
