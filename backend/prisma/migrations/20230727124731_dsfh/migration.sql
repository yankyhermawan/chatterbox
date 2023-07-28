/*
  Warnings:

  - You are about to alter the column `channelName` on the `Channel` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - A unique constraint covering the columns `[channelName]` on the table `Channel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `channelImageURL` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileImageURL` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "channelImageURL" TEXT NOT NULL,
ALTER COLUMN "channelName" SET DATA TYPE VARCHAR(20);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileImageURL" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Channel_channelName_key" ON "Channel"("channelName");
