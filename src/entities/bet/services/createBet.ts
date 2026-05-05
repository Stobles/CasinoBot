import type { BetData } from "@/entities/bet/index.js";
import { prisma } from "@/shared/lib/db.js";

export async function createBet(
  amount: number,
  roundId: string,
  chatUserId: string,
  data: BetData,
) {
  const userBetCount = await prisma.roundBet.count({
    where: { roundId, chatUserId },
  });

  if (userBetCount >= 5) throw new Error("bet-limit-exceeded");

  return await prisma.roundBet.create({
    data: {
      status: "OPEN",
      type: "ROULETTE",
      roundId,
      chatUserId,
      amount,
      data,
    },
  });
}
