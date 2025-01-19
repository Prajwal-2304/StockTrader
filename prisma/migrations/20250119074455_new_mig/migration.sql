/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Stock` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "id" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Stock_id_key" ON "Stock"("id");
