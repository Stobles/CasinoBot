import { ensureChatUser } from "@/entities/chat-user/index.js";
import { ensureChat } from "@/entities/chat/index.js";
import { ensureUser } from "@/entities/user/index.js";
import { Context } from "telegraf";
export async function ensureSession(ctx) {
    if (!ctx.from || !ctx.chat) {
        throw new Error("Invalid telegram context");
    }
    const user = await ensureUser({
        telegramId: ctx.from.id,
        username: ctx.from.username || null,
        firstName: ctx.from.first_name,
        lastName: ctx.from.last_name || null,
    });
    const chat = await ensureChat({
        telegramId: ctx.chat.id,
        title: ctx.chat.type != "private" ? ctx.chat.title : "",
    });
    const chatUser = await ensureChatUser(user.id, chat.id);
    return { user, chat, chatUser };
}
//# sourceMappingURL=ensure-session.js.map