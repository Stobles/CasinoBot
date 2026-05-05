import type { GameRoundEntity } from "@/entities/game-round/index.js";
import { resolveGameRound } from "@/entities/game-round/services/resolve-game-round.js";
import { getRouletteGameResult } from "@/kernel/game/roulette/helpers.js";
import { left, type Either } from "@/shared/lib/either.js";

export async function resolveRound(
  roundId: string,
): Promise<Either<"no-valid-entry" | "game-error", GameRoundEntity>> {
  const gameResult = getRouletteGameResult();

  if (gameResult.type === "Left") {
    return left("no-valid-entry");
  }

  const resolvedGameRound = await resolveGameRound(roundId, gameResult.value);

  if (resolvedGameRound.type === "Left") return left("game-error");

  return resolvedGameRound;
}
