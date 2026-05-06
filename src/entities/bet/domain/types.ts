import type { RouletteColors } from "@/kernel/game/roulette/types.js";

export type BetEntity = {
  id: string;
  roundId: string;
  chatUserId: string;
  type: BetType;
  status: BetStatus;
  amount: number;
  payload: BetData;
};

export type BetData =
  | { type: "number"; value: number }
  | { type: "color"; value: RouletteColors };

export type BetType = "ROULETTE";

export type BetStatus = "WON" | "OPEN" | "LOST";
