import type { GameRoundEntity } from "@/entities/game-round/index.js";
import { type Either } from "@/shared/lib/either.js";
export declare function resolveRound(roundId: string): Promise<Either<"no-valid-entry" | "game-not-exist" | "game-closed", GameRoundEntity>>;
export declare const getResolveRoundError: (gameRound: Either<"no-valid-entry" | "game-not-exist" | "game-closed", GameRoundEntity>) => string | null;
//# sourceMappingURL=resolve-round.d.ts.map