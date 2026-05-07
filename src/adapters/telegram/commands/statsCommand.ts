import { ensureSession } from "@/features/session/ensure-session.js";
import { getUserStats } from "@/features/statistic/getUserStat.js";
import type { Telegraf } from "telegraf";
import { messages } from "../helpers/messages.js";

export function registerStatsCommand(bot: Telegraf) {
  bot.command("stat", async (ctx) => {
    const { chatUser } = await ensureSession(ctx);

    const stats = await getUserStats(chatUser.id);

    ctx.reply(messages.stats.userStat(stats));
  });
}
