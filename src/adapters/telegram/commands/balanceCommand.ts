import { getBalanceStatus } from "@/entities/chat-user/index.js";
import { ensureSession } from "@/features/session/ensure-session.js";
import type { Telegraf } from "telegraf";

export function registerBalanceCommand(bot: Telegraf) {
  bot.command("balance", async (ctx) => {
    const { chatUser } = await ensureSession(ctx);

    const balance = chatUser.balance;

    await ctx.reply(
      `💰 Баланс: ${balance} тугриков (${getBalanceStatus(balance)})`,
    );
  });
}
