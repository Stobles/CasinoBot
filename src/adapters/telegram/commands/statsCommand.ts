import { ensureSession } from "@/features/session/ensure-session.js";
import { getUserStats } from "@/features/statistic/getUserStat.js";
import type { Telegraf } from "telegraf";
import { formatUserStats } from "../helpers/formatUserStats.js";

export function registerStatsCommand(bot: Telegraf) {
  bot.command("stat", async (ctx) => {
    const { chatUser } = await ensureSession(ctx);

    const stats = await getUserStats(chatUser.id);
    const text = formatUserStats(stats);

    ctx.reply(text);
  });
}
