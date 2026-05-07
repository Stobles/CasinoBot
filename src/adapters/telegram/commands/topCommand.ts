import { formatChatUsersTop } from "../helpers/formatChatUsersTop.js";
import { ensureSession } from "@/features/session/ensure-session.js";
import { getChatUsersTop } from "@/features/statistic/getTopUsers.js";
import type { Telegraf } from "telegraf";
import { messages } from "../helpers/messages.js";
import { escapeMarkdownV2 } from "../helpers/escapeMarkdownV2.js";

export async function registerTopCommand(bot: Telegraf) {
  bot.command("top", async (ctx) => {
    const { chat } = await ensureSession(ctx);

    const chatUsersTopResult = await getChatUsersTop(chat.id);

    if (chatUsersTopResult.type === "Left") {
      await ctx.reply("Нет пользователей");
      return;
    }

    const topChatUsers = chatUsersTopResult.value.map((item) => ({
      username: escapeMarkdownV2(item.username || ""),
      balance: item.balance,
    }));

    await ctx.reply(messages.stats.topUsers(topChatUsers), {
      parse_mode: "MarkdownV2",
    });
  });
}
