/*
  Warnings:

  - You are about to drop the column `resultColor` on the `GameRound` table. All the data in the column will be lost.
  - You are about to drop the column `resultNumber` on the `GameRound` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `RoundBet` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `RoundBet` table. All the data in the column will be lost.
  - Added the required column `gameType` to the `GameRound` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `RoundBet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GameType" AS ENUM ('Roulette');

-- AlterTable
ALTER TABLE "GameRound" DROP COLUMN "resultColor",
DROP COLUMN "resultNumber",
ADD COLUMN     "gameType" "GameType" NOT NULL,
ADD COLUMN     "result" JSONB;

-- AlterTable
ALTER TABLE "RoundBet" DROP COLUMN "color",
DROP COLUMN "number",
ADD COLUMN     "data" JSONB NOT NULL;
