import type { GameRound } from "../../../generated/prisma/client.js";

export type GameRoundEntity = GameRoundRouletteEntity;

export type GameRoundRouletteEntity = {
  id: string;
  gameType: "ROULETTE";
  chatId: string;
  status: GameRoundStatus;
  endsAt: Date;
  result: GameRoundRouletteResult | null;
};

export type GameRoundTypes = "ROULETTE";

export type GameRoundStatus = "OPEN" | "CLOSED" | "RESOLVED";

export type GameRoundRouletteResult = {
  color: string;
  number: string;
};

export function getEndOfGameRound(durationSeconds: number): Date {
  return new Date(Date.now() + durationSeconds * 1000);
}

export function mapGameRound(db: GameRound): GameRoundEntity {
  if (db.gameType === "ROULETTE") {
    return {
      ...db,
      result: db.result as GameRoundRouletteResult | null,
    };
  }

  throw new Error(`Unsupported gameType: ${db.gameType}`);
}
