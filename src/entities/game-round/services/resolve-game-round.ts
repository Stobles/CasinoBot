import { prisma } from "@/shared/lib/db.js";
import { left, right, type Either } from "@/shared/lib/either.js";
import type { GameRoundEntity, GameRoundResult } from "../domain/types.js";
import { getRouletteGameResult, mapGameRound } from "../domain/helpers.js";

export async function resolveGameRound(
  roundId: string,
  result: GameRoundResult,
): Promise<Either<"game-not-exist" | "game-closed", GameRoundEntity>> {
  const gameRound = await prisma.gameRound.findFirst({
    where: {
      id: roundId,
    },
  });

  if (!gameRound) {
    return left("game-not-exist");
  }

  if (!(gameRound.status === "OPEN")) {
    return left("game-closed");
  }

  return right(
    mapGameRound(
      await prisma.gameRound.update({
        where: { id: roundId },
        data: {
          status: "RESOLVED",
          result,
        },
      }),
    ),
  );
}
