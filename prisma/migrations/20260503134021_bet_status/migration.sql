/*
  Warnings:

  - Added the required column `type` to the `RoundBet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BetStatus" AS ENUM ('OPEN', 'CLOSED');

-- AlterTable
ALTER TABLE "RoundBet" ADD COLUMN     "type" "BetStatus" NOT NULL;
