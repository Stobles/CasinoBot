import { ensureSession } from "@/features/session/ensure-session.js";
import type { Telegraf } from "telegraf";
import { messages } from "../helpers/messages.js";

export function registerBalanceCommand(bot: Telegraf) {
  bot.command("balance", async (ctx) => {
    const { chatUser } = await ensureSession(ctx);

    const balance = chatUser.balance;

    await ctx.reply(messages.user.balance(chatUser.username, balance));
  });
}
