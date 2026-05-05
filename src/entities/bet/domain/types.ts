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
