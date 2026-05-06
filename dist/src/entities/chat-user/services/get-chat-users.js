import { prisma } from "@/shared/lib/db.js";
export async function getChatUsers(where) {
    const chatUser = await prisma.chatUser.findMany({
        where,
        include: { user: true },
    });
    return chatUser.map((item) => ({
        id: item.id,
        chatId: item.chatId,
        userId: item.userId,
        username: item.user.username,
        balance: item.balance,
        dailyAt: item.dailyAt,
    }));
}
//# sourceMappingURL=get-chat-users.js.map