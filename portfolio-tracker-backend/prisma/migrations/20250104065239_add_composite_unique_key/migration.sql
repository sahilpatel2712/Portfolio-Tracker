/*
  Warnings:

  - A unique constraint covering the columns `[userId,ticker]` on the table `Stocks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Stocks_userId_ticker_key` ON `Stocks`(`userId`, `ticker`);
