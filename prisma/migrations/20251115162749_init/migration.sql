/*
  Warnings:

  - You are about to drop the column `endLocation` on the `Tour` table. All the data in the column will be lost.
  - You are about to drop the column `isFull` on the `Tour` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Tour` table. All the data in the column will be lost.
  - You are about to drop the column `quota` on the `Tour` table. All the data in the column will be lost.
  - You are about to drop the column `startLocation` on the `Tour` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[googleId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `Tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficulty` to the `Tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalSeats` to the `Tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weather` to the `Tour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tour" DROP COLUMN "endLocation",
DROP COLUMN "isFull",
DROP COLUMN "name",
DROP COLUMN "quota",
DROP COLUMN "startLocation",
ADD COLUMN     "availableSeats" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "difficulty" TEXT NOT NULL,
ADD COLUMN     "highlights" TEXT[],
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "totalSeats" INTEGER NOT NULL,
ADD COLUMN     "weather" TEXT NOT NULL,
ALTER COLUMN "time" SET DATA TYPE TEXT,
ALTER COLUMN "duration" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "googleId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");
