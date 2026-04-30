import {
  getEndOfGameRound,
  type GameRoundTypes,
} from "@/entities/game-round/index.js";
import { prisma } from "@/shared/lib/db.js";
import { roundEvents } from "@/shared/queues/game-round.js";

export async function createGameRound(
  type: GameRoundTypes,
  chatId: string,
  telegramChatId: bigint,
  duration: number = 60,
) {
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
    { delay: 1000 },
  );

  return newGameRound;
}
