import { prisma } from "@/shared/lib/db.js";
import { mapChatUser } from "../domain/helpers.js";
export async function ensureChatUser(userId, chatId) {
    return mapChatUser(await prisma.chatUser.upsert({
        where: { userId_chatId: { userId, chatId } },
        update: {},
        create: { userId, chatId },
        include: { user: true },
    }));
}
//# sourceMappingURL=ensure-chat-user.js.map