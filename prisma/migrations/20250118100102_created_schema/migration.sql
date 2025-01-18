-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('Buy', 'Sell');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "pan" TEXT NOT NULL,
    "bankacc" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "tpin" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nominee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "pan" TEXT NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Nominee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Watchlist" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Watchlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stock" (
    "ticker" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "volume" BIGINT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("ticker")
);

-- CreateTable
CREATE TABLE "WatchlistStock" (
    "id" SERIAL NOT NULL,
    "watchlistid" INTEGER NOT NULL,
    "stockTicker" TEXT NOT NULL,

    CONSTRAINT "WatchlistStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Portfolio" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortfolioStock" (
    "id" SERIAL NOT NULL,
    "portfolioid" INTEGER NOT NULL,
    "stockticker" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "investedAmt" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PortfolioStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "stockticker" TEXT NOT NULL,
    "type" "OrderType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_pan_key" ON "Users"("pan");

-- CreateIndex
CREATE UNIQUE INDEX "Users_bankacc_key" ON "Users"("bankacc");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_tpin_key" ON "Users"("tpin");

-- CreateIndex
CREATE UNIQUE INDEX "Nominee_pan_key" ON "Nominee"("pan");

-- AddForeignKey
ALTER TABLE "Nominee" ADD CONSTRAINT "Nominee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Watchlist" ADD CONSTRAINT "Watchlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchlistStock" ADD CONSTRAINT "WatchlistStock_watchlistid_fkey" FOREIGN KEY ("watchlistid") REFERENCES "Watchlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchlistStock" ADD CONSTRAINT "WatchlistStock_stockTicker_fkey" FOREIGN KEY ("stockTicker") REFERENCES "Stock"("ticker") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_userid_fkey" FOREIGN KEY ("userid") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioStock" ADD CONSTRAINT "PortfolioStock_portfolioid_fkey" FOREIGN KEY ("portfolioid") REFERENCES "Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioStock" ADD CONSTRAINT "PortfolioStock_stockticker_fkey" FOREIGN KEY ("stockticker") REFERENCES "Stock"("ticker") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_stockticker_fkey" FOREIGN KEY ("stockticker") REFERENCES "Stock"("ticker") ON DELETE RESTRICT ON UPDATE CASCADE;
