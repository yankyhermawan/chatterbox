/*
  Warnings:

  - You are about to drop the column `membersID` on the `Channel` table. All the data in the column will be lost.
  - You are about to alter the column `description` on the `Channel` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to drop the column `channelID` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `profileImageURL` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_ChannelToUser` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `description` on table `Channel` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_channelID_fkey";

-- DropForeignKey
ALTER TABLE "_ChannelToUser" DROP CONSTRAINT "_ChannelToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChannelToUser" DROP CONSTRAINT "_ChannelToUser_B_fkey";

-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "membersID",
ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(20);

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "channelID";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profileImageURL";

-- DropTable
DROP TABLE "_ChannelToUser";

-- CreateTable
CREATE TABLE "UserChannel" (
    "userID" TEXT NOT NULL,
    "channelID" TEXT NOT NULL,

    CONSTRAINT "UserChannel_pkey" PRIMARY KEY ("userID","channelID")
);

-- AddForeignKey
ALTER TABLE "UserChannel" ADD CONSTRAINT "UserChannel_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserChannel" ADD CONSTRAINT "UserChannel_channelID_fkey" FOREIGN KEY ("channelID") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
