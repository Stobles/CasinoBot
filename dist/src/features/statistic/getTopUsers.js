import { buildChatUsersTop } from "@/entities/chat-user/domain/helpers.js";
import { getChatUsers, } from "@/entities/chat-user/index.js";
import { left, right } from "@/shared/lib/either.js";
export async function getChatUsersTop(chatId) {
    const chatUsers = await getChatUsers({ chatId });
    if (!chatUsers.length)
        return left("no-users");
    const top = buildChatUsersTop(chatUsers);
    return right(top);
}
//# sourceMappingURL=getTopUsers.js.map