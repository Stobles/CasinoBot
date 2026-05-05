import { formatChatUsersTop } from "@/entities/chat-user/domain/helpers.js";
import { ensureSession } from "@/features/session/ensure-session.js";
import { getChatUsersTop } from "@/features/statistic/getTopUsers.js";
import type { Telegraf } from "telegraf";

export async function registerTopCommand(bot: Telegraf) {
  bot.command("top", async (ctx) => {
    const { chat } = await ensureSession(ctx);

    const chatUsersTopResult = await getChatUsersTop(chat.id);

    if (chatUsersTopResult.type === "Left") {
      await ctx.reply("Нет пользователей");
      return;
    }

    const message = `Топ пользователей казика в чате:\n\n ${formatChatUsersTop(chatUsersTopResult.value)}\n\n`;

    await ctx.reply(message, { parse_mode: "MarkdownV2" });
  });
}
