/*
  Warnings:

  - You are about to drop the column `dailyActiveUsers` on the `Stats` table. All the data in the column will be lost.
  - You are about to drop the column `lastReset` on the `Stats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Stats" DROP COLUMN "dailyActiveUsers",
DROP COLUMN "lastReset";

-- CreateTable
CREATE TABLE "DailyStats" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activeUsers" INTEGER NOT NULL DEFAULT 0,
    "savedThemes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DailyStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DailyStats_date_idx" ON "DailyStats"("date");

-- CreateIndex
CREATE UNIQUE INDEX "DailyStats_date_key" ON "DailyStats"("date");
