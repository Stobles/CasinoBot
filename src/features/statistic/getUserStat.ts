import { prisma } from "@/shared/lib/db.js";

export async function getUserStats(chatUserId: string) {
  const [chatUser, winAgg, betAgg] = await Promise.all([
    prisma.chatUser.findUnique({
      where: { id: chatUserId },
      select: { balance: true },
    }),
    prisma.transaction.aggregate({
      where: {
        chatUserId,
        type: "WIN",
      },
      _sum: {
        amount: true,
      },
    }),

    prisma.transaction.aggregate({
      where: {
        chatUserId,
        type: "BET",
      },
      _sum: {
        amount: true,
      },
    }),
  ]);

  if (!chatUser) {
    throw new Error("User not found");
  }

  const [totalBets, wonBets] = await prisma.$transaction([
    prisma.roundBet.count({ where: { chatUserId } }),
    prisma.roundBet.count({
      where: { chatUserId, status: "WON" },
    }),
  ]);

  const winRate = totalBets === 0 ? 0 : (wonBets / totalBets) * 100;

  const wonAmount = winAgg._sum.amount ?? 0;
  const lostAmount = betAgg._sum.amount ?? 0;

  return {
    balance: chatUser.balance,

    winRate,
    totalBets,
    wonBets,

    wonAmount,
    lostAmount,
  };
}
