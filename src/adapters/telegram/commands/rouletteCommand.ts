import { createGameRound } from "@/entities/game-round/services/create-game-round.js";
import { ensureSession } from "@/features/session/ensure-session.js";
import type { Telegraf } from "telegraf";

export function registerRouletteCommand(bot: Telegraf) {
  bot.command("roulette", async (ctx) => {
    const { chat } = await ensureSession(ctx);

    try {
      await createGameRound("ROULETTE", chat.id, chat.telegramId);

      await ctx.reply("🎰 Рулетка создана с таймером на 60 секунд");
    } catch (error) {
      console.log(error);
      await ctx.reply("❌ Рулетка уже создана в чате");
    }
  });
}
