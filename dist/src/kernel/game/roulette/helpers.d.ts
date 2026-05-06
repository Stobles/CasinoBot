import { type Either } from "@/shared/lib/either.js";
import type { RouletteColors } from "./types.js";
export declare const ROULETTE_VALUES: Record<RouletteColors, number[]>;
export declare function getRouletteGameResult(): Either<"no-valid-entry", {
    color: RouletteColors;
    number: number;
}>;
//# sourceMappingURL=helpers.d.ts.map