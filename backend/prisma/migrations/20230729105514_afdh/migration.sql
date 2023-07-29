/*
  Warnings:

  - Added the required column `channelID` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "channelID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_channelID_fkey" FOREIGN KEY ("channelID") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
