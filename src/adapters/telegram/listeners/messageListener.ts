import type { Telegraf } from "telegraf";
import { ensureSession } from "@/features/session/ensure-session.js";

export function registerMessageListener(bot: Telegraf) {
  bot.on("message", (ctx, next) => {
    if (!ctx.from || !ctx.chat) next();

    const {} = ensureSession(ctx);

    next();
  });
}
