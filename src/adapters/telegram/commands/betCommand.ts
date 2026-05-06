import { getCurrentRound } from "@/entities/game-round/services/get-current-round.js";
import { ensureSession } from "@/features/session/ensure-session.js";
import type { Telegraf } from "telegraf";
import {
  getParseBetCommandError,
  parseBetCommand,
} from "../helpers/getBetValues.js";
import { getPlaceBetError, placeBet } from "@/features/betting/place-bet.js";
import { ROULETTE_VALUES } from "@/kernel/game/roulette/helpers.js";
import { messages } from "../helpers/messages.js";

export function registerBetCommand(bot: Telegraf) {
  bot.command("dep", async (ctx) => {
    const { user, chat, chatUser } = await ensureSession(ctx);

    const currentRound = await getCurrentRound("ROULETTE", chat.id);

    if (!currentRound) {
      await ctx.reply(messages.betting.noRound);
      return;
    }

    const parsedCommand = parseBetCommand(ctx.message.text, ROULETTE_VALUES);

    if (parsedCommand.type === "Left") {
      const error = getParseBetCommandError(parsedCommand);
      if (error) await ctx.reply(error);
      return;
    }

    const {
      value: { amount, bet, color, number },
    } = parsedCommand;

    const placeBetResult = await placeBet(
      amount,
      currentRound.id,
      chatUser.id,
      bet,
    );

    if (placeBetResult.type === "Left") {
      const error = getPlaceBetError(placeBetResult);
      if (error) await ctx.reply(error);
      return;
    }

    await ctx.reply(
      messages.betting.placed(user.username || "", number, color, amount),
    );
  });
}
