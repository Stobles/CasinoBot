export type GameRoundEntity = GameRoundRouletteEntity;

export type GameRoundRouletteEntity = {
  id: string;
  gameType: "ROULETTE";
  chatId: string;
  status: GameRoundStatus;
  endsAt: Date;
  result: GameRoundRouletteResult | null;
};

export type GameRoundTypes = "ROULETTE";

export type GameRoundStatus = "OPEN" | "CLOSED" | "RESOLVED";

export type GameRoundResult = GameRoundRouletteResult;

export type GameRoundRouletteResult = {
  color: string;
  number: number;
};
