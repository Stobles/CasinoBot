import type { GameRound } from "@generated/prisma/client.js";
import type { GameRoundEntity } from "./types.js";
export declare function getEndOfGameRound(durationSeconds: number): Date;
export declare function mapGameRound(db: GameRound): GameRoundEntity;
//# sourceMappingURL=helpers.d.ts.map