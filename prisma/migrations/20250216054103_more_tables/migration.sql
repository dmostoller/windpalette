/*
  Warnings:

  - You are about to drop the column `colors` on the `Theme` table. All the data in the column will be lost.
  - You are about to drop the column `gradients` on the `Theme` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Theme" DROP COLUMN "colors",
DROP COLUMN "gradients";

-- CreateTable
CREATE TABLE "ThemeColor" (
    "id" TEXT NOT NULL,
    "themeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ThemeColor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gradient" (
    "id" TEXT NOT NULL,
    "themeId" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gradient_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ThemeColor" ADD CONSTRAINT "ThemeColor_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gradient" ADD CONSTRAINT "Gradient_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
