import { ROULETTE_BET_COFF } from "@/entities/bet/index.js";
import type { GameRoundRouletteResult } from "@/entities/game-round/index.js";
import type { RouletteResult } from "@/kernel/game/roulette/types.js";
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

    console.log(bets);

    for (const bet of bets) {
      const betData = bet.data as RouletteResult;
      console.log(betData.color, result.color);
      const isColorMatch = betData.color === result.color;

      const isNumberMatch = betData.number
        ? betData.number === result.number
        : true;

      const isWin = isColorMatch && isNumberMatch;

      console.log(isWin, isColorMatch, isNumberMatch);

      if (!isWin) {
        await tx.roundBet.update({
          where: { id: bet.id },
          data: { status: "LOST" },
        });

        continue;
      }

      console.log(bet);

      const payout = bet.amount * ROULETTE_BET_COFF[result.color];

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
      await tx.roundBet.update({
        where: { id: bet.id },
        data: { status: "WON" },
      });

      // 4. создаём транзакцию
      await tx.transaction.create({
        data: {
          chatUserId: bet.chatUserId,
          amount: payout,
          type: "WIN",
        },
      });
    }
  });
}
