import { type BetEntity } from "@/entities/bet/index.js";
import { type RouletteResult } from "@/kernel/game/roulette/types.js";
import { type Either } from "@/shared/lib/either.js";
export declare function payoutBet(roundId: string, result: RouletteResult): Promise<Either<"no-bets" | "db-error", {
    winners: BetEntity[];
    losers: BetEntity[];
}>>;
export declare const getPayoutBetError: (payout: Either<"no-bets" | "db-error", {
    winners: BetEntity[];
    losers: BetEntity[];
}>) => string | null;
//# sourceMappingURL=payout-bet.d.ts.map