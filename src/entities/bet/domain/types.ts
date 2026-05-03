export type BetEntity = {
  id: string;
  roundId: string;
  chatUserId: string;
  type: string;
  status: string;
  amount: number;
  data: string;
};

export type BetData = RouletteBetData;

export type RouletteBetData = {
  color?: string;
  number?: number | undefined;
};

export const ROULETTE_BET_COLOR = {
  black: "Черное",
  red: "Красное",
};
