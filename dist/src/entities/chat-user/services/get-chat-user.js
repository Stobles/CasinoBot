import { prisma } from "@/shared/lib/db.js";
export async function getChatUser(where) {
    const chatUser = await prisma.chatUser.findFirst({
        where,
        include: { user: true },
    });
    if (!chatUser)
        return null;
    return {
        id: chatUser.id,
        chatId: chatUser.chatId,
        userId: chatUser.userId,
        username: chatUser.user.username,
        balance: chatUser.balance,
        dailyAt: chatUser.dailyAt,
    };
}
//# sourceMappingURL=get-chat-user.js.map