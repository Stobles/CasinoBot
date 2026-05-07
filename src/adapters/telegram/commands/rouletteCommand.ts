import { createGameRound } from "@/entities/game-round/services/create-game-round.js";
import { ensureSession } from "@/features/session/ensure-session.js";
import { ROULETTE_ROUND_TIME } from "@/kernel/game/roulette/const.js";
import path from "node:path";
import type { Telegraf } from "telegraf";
import { messages } from "../helpers/messages.js";

export function registerRouletteCommand(bot: Telegraf) {
  bot.command("roll", async (ctx) => {
    const { chat } = await ensureSession(ctx);

    const gameRound = await createGameRound(
      "ROULETTE",
      chat.id,
      chat.telegramId,
    );

    if (gameRound.type === "Left") {
      await ctx.reply(messages.roulette.alreadyCreated);
      return;
    }
    const rouletteImage = path.resolve(
      process.cwd(),
      "./src/shared/assets/roulette.jpg",
    );

    try {
      await ctx.replyWithPhoto(
        { source: rouletteImage },
        {
          caption: messages.roulette.created,
        },
      );
    } catch (error) {
      await ctx.reply(messages.roulette.error(error));
    }
  });
}
