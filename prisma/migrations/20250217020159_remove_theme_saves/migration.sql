/*
  Warnings:

  - You are about to drop the `ThemeSave` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ThemeSave" DROP CONSTRAINT "ThemeSave_themeId_fkey";

-- DropForeignKey
ALTER TABLE "ThemeSave" DROP CONSTRAINT "ThemeSave_userId_fkey";

-- DropTable
DROP TABLE "ThemeSave";
