import { Context } from "telegraf";
import { ensureUser } from "../../features/user/index.js";
import { ensureChat } from "../../features/chat/index.js";
import { ensureChatUser } from "../../features/chat-user/index.js";

export async function ensureSession(ctx: Context) {
  if (!ctx.from || !ctx.chat) return;

  console.log("from - ", ctx.from);

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

  console.log(user, chat, chatUser);

  return { user, chat, chatUser };
}
