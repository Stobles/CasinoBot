import { prisma } from "@/shared/lib/db.js";
import { left, right } from "@/shared/lib/either.js";
import { mapGameRound } from "../domain/helpers.js";
export async function resolveGameRound(roundId, result) {
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
    return right(mapGameRound(await prisma.gameRound.update({
        where: { id: roundId },
        data: {
            status: "RESOLVED",
            result,
        },
    })));
}
//# sourceMappingURL=resolve-game-round.js.map