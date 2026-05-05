export const ROULETTE_COEFFICIENTS: Record<"number" | "color", number> = {
  number: 36,
  color: 2,
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
