import type { RouletteResult } from "@/kernel/game/roulette/types.js";
export type GameRoundEntity = GameRoundRouletteEntity;
export type GameRoundRouletteEntity = {
    id: string;
    gameType: "ROULETTE";
    chatId: string;
    status: GameRoundStatus;
    endsAt: Date;
    result: RouletteResult | null;
};
export type GameRoundTypes = "ROULETTE";
export type GameRoundStatus = "OPEN" | "CLOSED" | "RESOLVED";
export type GameRoundResult = RouletteResult;
//# sourceMappingURL=types.d.ts.map