import { prisma } from "@/shared/lib/db.js";
export async function createBet(amount, roundId, chatUserId, payload) {
    const userBetCount = await prisma.roundBet.count({
        where: { roundId, chatUserId },
    });
    if (userBetCount >= 5)
        throw new Error("bet-limit-exceeded");
    return await prisma.roundBet.create({
        data: {
            status: "OPEN",
            type: "ROULETTE",
            roundId,
            chatUserId,
            amount,
            payload,
        },
    });
}
//# sourceMappingURL=createBet.js.map