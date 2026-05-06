import type { BetData, BetEntity } from "@/entities/bet/index.js";
import { type Either } from "@/shared/lib/either.js";
export declare function placeBet(amount: number, roundId: string, chatUserId: string, data: BetData): Promise<Either<"bet-already-placed" | "insufficient-balance" | "bet-limit-exceeded", BetEntity>>;
export declare function getPlaceBetError(result: Either<"bet-already-placed" | "insufficient-balance" | "bet-limit-exceeded", BetEntity>): string | null;
//# sourceMappingURL=place-bet.d.ts.map