import type { RouletteResult } from "@/kernel/game/roulette/types.js";

export type BetEntity = {
  id: string;
  roundId: string;
  chatUserId: string;
  type: string;
  status: string;
  amount: number;
  data: BetData;
};

export type BetData = RouletteResult;

export type BetType = "ROULETTE";

export const ROULETTE_BET_COLOR: Record<"black" | "red" | "green", string> = {
  black: "Черное",
  red: "Красное",
  green: "Зеленое",
};

export const ROULETTE_BET_COFF: Record<"green" | "red" | "black", number> = {
  green: 50,
  black: 2,
  red: 2,
};
