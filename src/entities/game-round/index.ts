export type GameRoundTypes = "ROULETTE";

export function getEndOfGameRound(durationSeconds: number): Date {
  return new Date(Date.now() + durationSeconds * 1000);
}
