import { mapBetEntity } from "@/entities/bet/domain/helpers.js";
import { splitRouletteBets, type BetEntity } from "@/entities/bet/index.js";
import {
  ROULETTE_COEFFICIENTS,
  type RouletteResult,
} from "@/kernel/game/roulette/types.js";
import { prisma } from "@/shared/lib/db.js";
import { left, matchEither, right, type Either } from "@/shared/lib/either.js";

export async function payoutBet(
  roundId: string,
  result: RouletteResult,
): Promise<
  Either<"no-bets" | "db-error", { winners: BetEntity[]; losers: BetEntity[] }>
> {
  try {
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

      await tx.roundBet.updateMany({
        where: {
          id: { in: losers.map((b) => b.id) },
        },
        data: {
          status: "LOST",
        },
      });

      for (const bet of winners) {
        const payout = bet.amount * ROULETTE_COEFFICIENTS[bet.data.type];

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
  } catch (e) {
    return left("db-error");
  }
}

export const getPayoutBetError = (
  payout: Either<
    "no-bets" | "db-error",
    { winners: BetEntity[]; losers: BetEntity[] }
  >,
) =>
  matchEither(payout, {
    right: () => null,
    left: (e) =>
      ({
        "db-error": "Ошибка при запросе в БД",
        "no-bets": "Недостаточное количество ставок",
      })[e],
  });
