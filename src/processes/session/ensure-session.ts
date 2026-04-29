import { Context } from "telegraf";
import { ensureUser } from "@features/user/ensure-user.js";
import { ensureChat } from "@features/chat/ensure-chat.js";
import { ensureChatUser } from "@features/chat-user/ensure-chat-user.js";

export async function ensureSession(ctx: Context) {
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
