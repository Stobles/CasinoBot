import type { RouletteResult } from "@/kernel/game/roulette/types.js";
import type { BetEntity } from "./types.js";
import type { RoundBet } from "@generated/prisma/client.js";
export declare function mapBetEntity(bet: RoundBet): BetEntity;
export declare function splitRouletteBets(bets: BetEntity[], result: RouletteResult): {
    winners: BetEntity[];
    losers: BetEntity[];
};
//# sourceMappingURL=helpers.d.ts.map