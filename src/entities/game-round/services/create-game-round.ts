import { prisma } from "@/shared/lib/db.js";
import { roundEvents } from "@/shared/queues/game-round.js";
import { getEndOfGameRound, mapGameRound } from "../domain/helpers.js";
import type { GameRoundEntity, GameRoundTypes } from "../domain/types.js";
import { left, right, type Either } from "@/shared/lib/either.js";
import { ROULETTE_ROUND_TIME } from "@/kernel/game/roulette/const.js";

export async function createGameRound(
  type: GameRoundTypes,
  chatId: string,
  telegramChatId: bigint,
  duration: number = 60,
): Promise<Either<"game-open", GameRoundEntity>> {
  const gameRound = await prisma.gameRound.findFirst({
    where: { chatId, status: "OPEN", gameType: type },
  });

  if (gameRound) return left("game-open");

  const newGameRound = await prisma.gameRound.create({
    data: {
      status: "OPEN",
      gameType: type,
      chatId,
      endsAt: getEndOfGameRound(duration),
    },
  });

  await roundEvents.emit(
    {
      type: "resolveRound",
      data: {
        roundId: newGameRound.id,
        chatTelegramId: telegramChatId.toString(),
      },
    },
    { delay: ROULETTE_ROUND_TIME * 1000 },
  );

  return right(mapGameRound(newGameRound));
}
