import type { GameRoundRouletteResult } from "@/entities/game-round/index.js";
import { prisma } from "@/shared/lib/db.js";

export async function payoutBet(
  roundId: string,
  result: GameRoundRouletteResult,
) {
  return prisma.$transaction(async (tx) => {
    // 1. забираем все открытые ставки
    const bets = await tx.roundBet.findMany({
      where: { roundId, status: "OPEN" },
    });

    for (const bet of bets) {
      const isColorMatch = bet.data === result.color;

      const isNumberMatch =
        bet.number !== null ? bet.number === result.number : true;

      const isWin = isColorMatch && isNumberMatch;

      if (!isWin) {
        await tx.bet.update({
          where: { id: bet.id },
          data: { status: "LOST" },
        });

        continue;
      }

      const payout = bet.amount * 2;

      // 2. обновляем баланс пользователя
      await tx.chatUser.update({
        where: { id: bet.chatUserId },
        data: {
          balance: {
            increment: payout,
          },
        },
      });

      // 3. помечаем ставку как выигрыш
      await tx.bet.update({
        where: { id: bet.id },
        data: { status: "WON" },
      });

      // 4. создаём транзакцию
      await tx.transaction.create({
        data: {
          chatUserId: bet.chatUserId,
          betId: bet.id,
          amount: payout,
          type: "WIN",
        },
      });
    }
  });
}
