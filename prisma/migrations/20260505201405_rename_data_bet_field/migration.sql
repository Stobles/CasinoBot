/*
  Warnings:

  - You are about to drop the column `data` on the `RoundBet` table. All the data in the column will be lost.
  - Added the required column `payload` to the `RoundBet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RoundBet" DROP COLUMN "data",
ADD COLUMN     "payload" JSONB NOT NULL;
