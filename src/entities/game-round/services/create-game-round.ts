import { prisma } from "@/shared/lib/db.js";
import { roundEvents } from "@/shared/queues/game-round.js";
import { getEndOfGameRound, mapGameRound } from "../domain/helpers.js";
import type { GameRoundEntity, GameRoundTypes } from "../domain/types.js";

export async function createGameRound(
  type: GameRoundTypes,
  chatId: string,
  telegramChatId: bigint,
  duration: number = 60,
): Promise<GameRoundEntity> {
  const gameRound = await prisma.gameRound.findFirst({
    where: { chatId, status: "OPEN", gameType: type },
  });

  if (gameRound) throw new Error("game-open");

  console.log(getEndOfGameRound(duration));

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
    { delay: 60000 },
  );

  return mapGameRound(newGameRound);
}
