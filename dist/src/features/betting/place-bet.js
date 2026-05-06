import { mapBetEntity } from "@/entities/bet/domain/helpers.js";
import { prisma } from "@/shared/lib/db.js";
import { left, matchEither, right } from "@/shared/lib/either.js";
export async function placeBet(amount, roundId, chatUserId, data) {
    return await prisma.$transaction(async (tx) => {
        const existingBet = await tx.roundBet.findFirst({
            where: {
                chatUserId,
                roundId,
                status: "OPEN",
                type: "ROULETTE",
                payload: {
                    equals: data,
                },
            },
        });
        if (existingBet) {
            return left("bet-already-placed");
        }
        const balanceUpdate = await tx.chatUser.updateMany({
            where: {
                id: chatUserId,
                balance: { gte: amount },
            },
            data: {
                balance: { decrement: amount },
            },
        });
        if (balanceUpdate.count === 0) {
            return left("insufficient-balance");
        }
        const betsCount = await tx.roundBet.count({
            where: {
                chatUserId,
                roundId,
            },
        });
        if (betsCount >= 3) {
            return left("bet-limit-exceeded");
        }
        const bet = await tx.roundBet.create({
            data: {
                type: "ROULETTE",
                status: "OPEN",
                chatUserId,
                roundId,
                amount,
                payload: data,
            },
        });
        await tx.transaction.create({
            data: {
                chatUserId,
                amount,
                type: "BET",
            },
        });
        return right(mapBetEntity(bet));
    });
}
export function getPlaceBetError(result) {
    return matchEither(result, {
        right: () => null,
        left: (e) => ({
            "insufficient-balance": "❌️ Ты бедный",
            "bet-limit-exceeded": "❌️ Превышено количество ставок",
            "bet-already-placed": "❌️ Такая ставка уже существует",
        })[e],
    });
}
//# sourceMappingURL=place-bet.js.map