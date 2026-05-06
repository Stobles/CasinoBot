import { prisma } from "@/shared/lib/db.js";
import { mapGameRound } from "../domain/helpers.js";
export async function getCurrentRound(type, chatId) {
    const gameRound = await prisma.gameRound.findFirst({
        where: { gameType: type, chatId, status: "OPEN" },
    });
    if (!gameRound)
        return null;
    return mapGameRound(gameRound);
}
//# sourceMappingURL=get-current-round.js.map