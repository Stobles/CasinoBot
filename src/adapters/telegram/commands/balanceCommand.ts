import { getBalanceStatus } from "@/entities/chat-user/index.js";
import { ensureSession } from "@/features/session/ensure-session.js";
import { BALANCE_CURRENCY } from "@/shared/consts/const.js";
import type { Telegraf } from "telegraf";

export function registerBalanceCommand(bot: Telegraf) {
  bot.command("balance", async (ctx) => {
    const { chatUser } = await ensureSession(ctx);

    const balance = chatUser.balance;

    await ctx.reply(
      `💰 Баланс @${chatUser.username}: ${balance}${BALANCE_CURRENCY} (${getBalanceStatus(balance)})`,
    );
  });
}
