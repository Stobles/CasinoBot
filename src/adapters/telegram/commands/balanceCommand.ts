import { getBalanceStatus } from "@/entities/balance/index.js";
import { ensureSession } from "@/processes/session/ensure-session.js";
import type { Telegraf } from "telegraf";

export function registerBalanceCommand(bot: Telegraf) {
  bot.command("balance", async (ctx) => {
    const { chatUser } = await ensureSession(ctx);

    const balance = chatUser.balance;

    await ctx.reply(`💰 Баланс: ${balance} (${getBalanceStatus(balance)})`);
  });
}
