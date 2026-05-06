import { prisma } from "@/shared/lib/db.js";
export async function updateChatUser(where, data) {
    const chatUser = await prisma.chatUser.update({
        where,
        data,
        include: { user: true },
    });
    return {
        id: chatUser.id,
        chatId: chatUser.chatId,
        userId: chatUser.userId,
        username: chatUser.user.username,
        balance: chatUser.balance,
        dailyAt: chatUser.dailyAt,
    };
}
//# sourceMappingURL=update-chat-user.js.map