import { getCurrentRound } from "@/entities/game-round/services/get-current-round.js";
import { ensureSession } from "@/features/session/ensure-session.js";
import type { Telegraf } from "telegraf";
import {
  getParseBetCommandError,
  parseBetCommand,
} from "../helpers/getBetValues.js";
import { placeBet } from "@/features/betting/place-bet.js";
import { ROULETTE_VALUES } from "@/kernel/game/roulette/helpers.js";
import { ROULETTE_COLORS_MAP } from "@/kernel/game/roulette/types.js";

export function registerBetCommand(bot: Telegraf) {
  bot.command("dep", async (ctx) => {
    const { user, chat, chatUser } = await ensureSession(ctx);

    const parsedCommand = parseBetCommand(ctx.message.text, ROULETTE_VALUES);

    if (parsedCommand.type === "Left") {
      const error = getParseBetCommandError(parsedCommand);
      if (error) await ctx.reply(error);
      return;
    }

    const {
      value: { amount, bet, color, number },
    } = parsedCommand;

    const currentRound = await getCurrentRound("ROULETTE", chat.id);

    if (!currentRound) {
      await ctx.reply("В чате не создана рулетка");
      return;
    }

    try {
      await placeBet(amount, currentRound.id, chatUser.id, bet);

      await ctx.reply(
        `@${user.username} сделал ставку на ${number || ""} ${ROULETTE_COLORS_MAP[color]} в размере ${amount} тугриков`,
      );
    } catch (e) {
      if (e === "bet-limit-exceeded")
        await ctx.reply("❌ Вы достигли максимального количества ставок");

      await ctx.reply(`Ошибочка вышла ${e}`);
    }
  });
}
