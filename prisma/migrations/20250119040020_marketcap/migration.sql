/*
  Warnings:

  - You are about to drop the column `volume` on the `Stock` table. All the data in the column will be lost.
  - Added the required column `marketcap` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stock" DROP COLUMN "volume",
ADD COLUMN     "marketcap" DOUBLE PRECISION NOT NULL;
