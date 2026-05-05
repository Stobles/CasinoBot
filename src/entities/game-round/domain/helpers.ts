import type { GameRound } from "@generated/prisma/client.js";
import type { GameRoundEntity } from "./types.js";
import type { RouletteResult } from "@/kernel/game/roulette/types.js";

export function getEndOfGameRound(durationSeconds: number): Date {
  return new Date(Date.now() + durationSeconds * 1000);
}

export function mapGameRound(db: GameRound): GameRoundEntity {
  if (db.gameType === "ROULETTE") {
    return {
      ...db,
      result: db.result as RouletteResult | null,
    };
  }

  throw new Error(`Unsupported gameType: ${db.gameType}`);
}
