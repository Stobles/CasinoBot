import type { RouletteResult } from "@/kernel/game/roulette/types.js";
import type { BetData, BetEntity } from "./types.js";
import type { RoundBet } from "@generated/prisma/client.js";

export function mapBetEntity(bet: RoundBet): BetEntity {
  return {
    id: bet.id,
    roundId: bet.roundId,
    chatUserId: bet.chatUserId,
    type: bet.type,
    status: bet.status,
    payload: bet.payload as BetData,
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
    const data = bet.payload;

    let isWin = false;

    if (data.type === "color") {
      isWin = data.value === result.color;
    }

    if (data.type === "number") {
      isWin = data.value === result.number;
    }

    if (isWin) {
      winners.push(bet);
    } else {
      losers.push(bet);
    }
  }

  return { winners, losers };
}
