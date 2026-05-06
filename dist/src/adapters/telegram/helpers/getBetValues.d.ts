import type { BetData } from "@/entities/bet/index.js";
import type { RouletteColors } from "@/kernel/game/roulette/types.js";
import { type Either } from "@/shared/lib/either.js";
type BetColor = "black" | "red";
type ParsedBet = {
    color: RouletteColors;
    amount: number;
    number: number | null;
    bet: BetData;
};
export declare function parseBetCommand(input: string, values: Record<BetColor, number[]>): Either<"not-enough-args" | "wrong-color" | "wrong-number" | "wrong-amount", ParsedBet>;
export declare function getParseBetCommandError(result: Either<"not-enough-args" | "wrong-color" | "wrong-number" | "wrong-amount", ParsedBet>): string | null;
export {};
//# sourceMappingURL=getBetValues.d.ts.map