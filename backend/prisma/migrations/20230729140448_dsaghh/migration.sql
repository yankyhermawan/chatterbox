/*
  Warnings:

  - You are about to alter the column `name` on the `Channel` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE "Channel" ALTER COLUMN "name" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "description" SET DATA TYPE TEXT;
