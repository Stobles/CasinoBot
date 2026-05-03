import { createGameRound } from "@/entities/game-round/services/create-game-round.js";
import { ensureSession } from "@/features/session/ensure-session.js";
import path from "node:path";
import type { Telegraf } from "telegraf";

export function registerRouletteCommand(bot: Telegraf) {
  bot.command("roulette", async (ctx) => {
    const { chat } = await ensureSession(ctx);

    const gameRound = await createGameRound(
      "ROULETTE",
      chat.id,
      chat.telegramId,
    );

    if (gameRound.type === "Left") {
      await ctx.reply("❌ Рулетка уже создана в чате");
    }
    const rouletteImage = path.resolve(
      process.cwd(),
      "./src/shared/assets/gorbachov_gamble.jpg",
    );

    try {
      await ctx.replyWithPhoto(
        { source: rouletteImage },
        {
          caption: "🎰 Создана рулетка на 60 секунд",
        },
      );
    } catch (error) {
      await ctx.reply(`❌ Непредвиденная ошибка ${error}`);
    }
  });
}
