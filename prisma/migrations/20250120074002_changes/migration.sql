/*
  Warnings:

  - You are about to drop the column `marketcap` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Stock` table. All the data in the column will be lost.
  - Added the required column `chain` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supply` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `balance` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stock" DROP COLUMN "marketcap",
DROP COLUMN "type",
ADD COLUMN     "chain" TEXT NOT NULL,
ADD COLUMN     "supply" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL;
