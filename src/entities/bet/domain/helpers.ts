import type { RouletteResult } from "@/kernel/game/roulette/types.js";
import type { BetEntity } from "./types.js";
import type { RoundBet } from "@generated/prisma/client.js";

export function mapBetEntity(bet: RoundBet): BetEntity {
  return {
    id: bet.id,
    roundId: bet.roundId,
    chatUserId: bet.chatUserId,
    type: bet.type,
    status: bet.status,
    data: bet.data as RouletteResult,
    amount: bet.amount,
  };
}

export function splitRouletteBets(
  bets: BetEntity[],
  result: RouletteResult,
): {
  winners: BetEntity[];
  losers: BetEntity[];
} {
  const winners: BetEntity[] = [];
  const losers: BetEntity[] = [];

  for (const bet of bets) {
    if (bet.type !== "ROULETTE") {
      continue;
    }

    const data = bet.data as {
      color: "green" | "red" | "black";
      number?: number | null;
    };

    const isColorMatch = data.color === result.color;

    const isNumberMatch =
      data.number !== undefined && data.number !== null
        ? data.number === result.number
        : true;

    const isWin = isColorMatch && isNumberMatch;

    if (isWin) {
      winners.push(bet);
    } else {
      losers.push(bet);
    }
  }

  return { winners, losers };
}
