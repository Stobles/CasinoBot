import type { BetData } from "@/entities/bet/index.js";
import { prisma } from "@/shared/lib/db.js";

export async function placeBet(
  amount: number,
  roundId: string,
  chatUserId: string,
  data: BetData,
) {
  return await prisma.$transaction(async (tx) => {
    const balanceUpdate = await tx.chatUser.updateMany({
      where: {
        id: chatUserId,
        balance: { gte: amount },
      },
      data: {
        balance: { decrement: amount },
      },
    });

    if (balanceUpdate.count === 0) {
      throw new Error("INSUFFICIENT_BALANCE");
    }

    const betsCount = await tx.roundBet.count({
      where: {
        chatUserId,
        roundId,
      },
    });

    if (betsCount >= 3) {
      throw new Error("BET_LIMIT_EXCEEDED");
    }

    const bet = await tx.roundBet.create({
      data: {
        type: "ROULETTE",
        status: "OPEN",
        chatUserId,
        roundId,
        amount,
        data,
      },
    });

    await tx.transaction.create({
      data: {
        chatUserId,
        amount,
        type: "BET",
      },
    });

    return bet;
  });
}
