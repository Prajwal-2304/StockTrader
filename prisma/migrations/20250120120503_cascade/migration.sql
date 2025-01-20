-- DropForeignKey
ALTER TABLE "WatchlistStock" DROP CONSTRAINT "WatchlistStock_watchlistid_fkey";

-- AddForeignKey
ALTER TABLE "WatchlistStock" ADD CONSTRAINT "WatchlistStock_watchlistid_fkey" FOREIGN KEY ("watchlistid") REFERENCES "Watchlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
