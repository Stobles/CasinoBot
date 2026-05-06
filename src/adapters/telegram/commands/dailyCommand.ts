import {
  dailyPayout,
  getDailyPayoutError,
} from "@/features/payout/daily-payout.js";
import { ensureSession } from "@/features/session/ensure-session.js";
import { BALANCE_CURRENCY } from "@/shared/consts/const.js";
import type { Telegraf } from "telegraf";
import { messages } from "../helpers/messages.js";

export function registerDailyCommand(bot: Telegraf) {
  bot.command("daily", async (ctx) => {
    const { chatUser } = await ensureSession(ctx);

    const dailyPayoutResult = await dailyPayout(chatUser.id);

    if (dailyPayoutResult.type === "Left") {
      const error = getDailyPayoutError(dailyPayoutResult);

      if (error) await ctx.sendMessage(error, { parse_mode: "MarkdownV2" });
      return;
    }

    await ctx.sendMessage(messages.daily);
  });
}
