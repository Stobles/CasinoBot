export type BetData = RouletteBetData;

export type RouletteBetData = {
  color?: string;
  number?: number | undefined;
};

export const ROULETTE_BET_COLOR = {
  black: "Черное",
  red: "Красное",
};
