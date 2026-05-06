import { resolveGameRound } from "@/entities/game-round/services/resolve-game-round.js";
import { getRouletteGameResult } from "@/kernel/game/roulette/helpers.js";
import { left, matchEither } from "@/shared/lib/either.js";
export async function resolveRound(roundId) {
    const gameResult = getRouletteGameResult();
    if (gameResult.type === "Left") {
        return left("no-valid-entry");
    }
    const resolvedGameRound = await resolveGameRound(roundId, gameResult.value);
    if (resolvedGameRound.type === "Left")
        return left(resolvedGameRound.value);
    return resolvedGameRound;
}
export const getResolveRoundError = (gameRound) => matchEither(gameRound, {
    right: () => null,
    left: (e) => ({
        "no-valid-entry": "Разраб написал плохой код, ошибка в функции getRouletteGameResult()",
        "game-not-exist": "Игры не существует, ее нельзя завершить",
        "game-closed": "Игра уже завершена",
    })[e],
});
//# sourceMappingURL=resolve-round.js.map