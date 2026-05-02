import { createBet } from "@/features/bet/create-bet.js";
import { getCurrentRound } from "@/features/game-round/get-current-round.js";
import { ensureSession } from "@/processes/session/ensure-session.js";
import type { Telegraf } from "telegraf";
import { parseBetCommand } from "../helpers/getBetValues.js";
import { ROULETTE_BET_COLOR } from "@/entities/bet/index.js";

export function registerBetCommand(bot: Telegraf) {
  bot.command("dep", async (ctx) => {
    const { chat, chatUser } = await ensureSession(ctx);

    const { color, number, amount } = parseBetCommand(ctx.message.text);

    const currentRound = await getCurrentRound("ROULETTE", chat.id);

    if (!currentRound) {
      await ctx.reply("В чате не создана рулетка");
      return;
    }

    try {
      const bet = await createBet(amount, currentRound.id, chatUser.id, {
        color: "black",
        number,
      });

      console.log(bet);

      await ctx.reply(
        `Создана ставка на ${ROULETTE_BET_COLOR[color]} ${number || ""} в размере ${amount}`,
      );
    } catch (e) {
      if (e === "bet-limit-exceeded")
        await ctx.reply("❌ Вы достигли максимального количества ставок");
    }
  });
}
