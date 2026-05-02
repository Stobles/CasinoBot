import { prisma } from "@/shared/lib/db.js";
import type { GameRoundEntity, GameRoundTypes } from "../domain/types.js";
import { mapGameRound } from "../domain/helpers.js";

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
