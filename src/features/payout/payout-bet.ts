import { mapBetEntity } from "@/entities/bet/domain/helpers.js";
import { splitRouletteBets, type BetEntity } from "@/entities/bet/index.js";
import {
  ROULETTE_COEFFICIENTS,
  type RouletteResult,
} from "@/kernel/game/roulette/types.js";
import { prisma } from "@/shared/lib/db.js";
import { left, right, type Either } from "@/shared/lib/either.js";

export async function payoutBet(
  roundId: string,
  result: RouletteResult,
): Promise<Either<"no-bets", { winners: BetEntity[]; losers: BetEntity[] }>> {
  return prisma.$transaction(async (tx) => {
    const bets = await tx.roundBet.findMany({
      where: { roundId, status: "OPEN" },
      include: {
        chatUser: {
          include: { user: true },
        },
      },
    });

    if (!bets.length) return left("no-bets");

    const mappedBets = bets.map(mapBetEntity);

    const { winners, losers } = splitRouletteBets(mappedBets, result);

    // 1. проигравшие — bulk update (быстрее и чище)
    await tx.roundBet.updateMany({
      where: {
        id: { in: losers.map((b) => b.id) },
      },
      data: {
        status: "LOST",
      },
    });

    // 2. выигрыши — последовательно (или можно batch)
    for (const bet of winners) {
      const payout = bet.amount * ROULETTE_COEFFICIENTS[result.color];

      await tx.chatUser.update({
        where: { id: bet.chatUserId },
        data: {
          balance: {
            increment: payout,
          },
        },
      });

      await tx.roundBet.update({
        where: { id: bet.id },
        data: { status: "WON" },
      });

      await tx.transaction.create({
        data: {
          chatUserId: bet.chatUserId,
          amount: payout,
          type: "WIN",
        },
      });
    }

    return right({ winners, losers });
  });
}
