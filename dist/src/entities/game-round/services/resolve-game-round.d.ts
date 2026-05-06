import { type Either } from "@/shared/lib/either.js";
import type { GameRoundEntity, GameRoundResult } from "../domain/types.js";
export declare function resolveGameRound(roundId: string, result: GameRoundResult): Promise<Either<"game-not-exist" | "game-closed", GameRoundEntity>>;
//# sourceMappingURL=resolve-game-round.d.ts.map