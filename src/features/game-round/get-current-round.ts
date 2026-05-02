import {
  mapGameRound,
  type GameRoundEntity,
  type GameRoundTypes,
} from "@/entities/game-round/index.js";
import { prisma } from "@/shared/lib/db.js";

export async function getCurrentRound(
  type: GameRoundTypes,
  chatId: string,
): Promise<GameRoundEntity | null> {
  const gameRound = await prisma.gameRound.findFirst({
    where: { gameType: type, chatId, status: "OPEN" },
  });

  if (!gameRound) return null;

  return mapGameRound(gameRound);
}
