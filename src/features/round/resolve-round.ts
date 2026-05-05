import type { GameRoundEntity } from "@/entities/game-round/index.js";
import { resolveGameRound } from "@/entities/game-round/services/resolve-game-round.js";
import { getRouletteGameResult } from "@/kernel/game/roulette/helpers.js";
import { left, matchEither, type Either } from "@/shared/lib/either.js";

export async function resolveRound(
  roundId: string,
): Promise<
  Either<"no-valid-entry" | "game-not-exist" | "game-closed", GameRoundEntity>
> {
  const gameResult = getRouletteGameResult();

  if (gameResult.type === "Left") {
    return left("no-valid-entry");
  }

  const resolvedGameRound = await resolveGameRound(roundId, gameResult.value);

  if (resolvedGameRound.type === "Left") return left(resolvedGameRound.value);

  return resolvedGameRound;
}

export const getResolveRoundError = (
  gameRound: Either<
    "no-valid-entry" | "game-not-exist" | "game-closed",
    GameRoundEntity
  >,
) =>
  matchEither(gameRound, {
    right: () => null,
    left: (e) =>
      ({
        "no-valid-entry":
          "Разраб написал плохой код, ошибка в функции getRouletteGameResult()",
        "game-not-exist": "Игры не существует, ее нельзя завершить",
        "game-closed": "Игра уже завершена",
      })[e],
  });
