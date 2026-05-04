import type { GameRound } from "@generated/prisma/client.js";
import type { GameRoundEntity, GameRoundRouletteResult } from "./types.js";
import { left, right, type Either } from "@/shared/lib/either.js";

const ROULETTE_COLORS = ["black", "red", "green"] as const;
type RouletteColor = (typeof ROULETTE_COLORS)[number];

const ROULETTE_NUMBERS = Array.from({ length: 37 }, (_, i) => i);

export const ROULETTE_VALUES: Record<RouletteColor, number[]> = {
  black: [15, 4, 2, 17, 6, 13, 11, 8, 10, 24, 33, 20, 31, 22, 29, 28, 35, 26],
  red: [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3],
  green: [0],
};

function getRandomFromArray<T extends unknown[] | readonly unknown[]>(
  arr: T,
): T[number] {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getRouletteGameResult(): Either<
  "no-valid-entry",
  { color: RouletteColor; number: number }
> {
  const number = getRandomFromArray(ROULETTE_NUMBERS);

  const entry = (
    Object.entries(ROULETTE_VALUES) as [RouletteColor, number[]][]
  ).find(([, values]) => values.includes(number));

  if (!entry) {
    return left("no-valid-entry");
  }

  const [color] = entry;

  return right({ color, number });
}

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
