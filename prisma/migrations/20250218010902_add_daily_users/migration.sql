-- CreateTable
CREATE TABLE "Stats" (
    "id" TEXT NOT NULL DEFAULT 'global-stats',
    "dailyActiveUsers" INTEGER NOT NULL DEFAULT 0,
    "totalSavedThemes" INTEGER NOT NULL DEFAULT 0,
    "lastReset" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DailyUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DailyUser_date_idx" ON "DailyUser"("date");

-- CreateIndex
CREATE UNIQUE INDEX "DailyUser_userId_date_key" ON "DailyUser"("userId", "date");
