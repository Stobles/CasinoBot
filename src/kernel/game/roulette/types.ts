export const ROULETTE_COEFFICIENTS: Record<RouletteColors, number> = {
  red: 2,
  black: 2,
  green: 14,
};

export const ROULETTE_COLORS_MAP: Record<"black" | "red" | "green", string> = {
  black: "Черное",
  red: "Красное",
  green: "Зеленое",
};

export type RouletteColors = "green" | "red" | "black";

export type RouletteResult = {
  color: RouletteColors;
  number?: number | undefined;
};
