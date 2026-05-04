import {
  registerMessageListener,
  type TelegramModule,
} from "../adapters/telegram/index.js";
import { registerBalanceCommand } from "@/adapters/telegram/commands/balanceCommand.js";
import { registerRouletteCommand } from "@/adapters/telegram/commands/rouletteCommand.js";
import { roundEvents } from "@/shared/queues/game-round.js";
import { bot } from "@/shared/lib/bot.js";
import { registerBetCommand } from "@/adapters/telegram/commands/betCommand.js";

import "dotenv/config";
import { resolveRound } from "@/features/round/resolve-round.js";
import { payoutBet } from "@/features/payout/payout-bet.js";
import { ROULETTE_BET_COLOR } from "@/entities/bet/index.js";

const modules: TelegramModule[] = [
  registerBalanceCommand,
  registerRouletteCommand,
  registerMessageListener,
  registerBetCommand,
];

modules.forEach((m) => m(bot));

roundEvents.startWorker();

roundEvents.on("resolveRound", async ({ data }) => {
  const { roundId, chatTelegramId } = data;

  const gameRound = await resolveRound(roundId);

  if (gameRound.type === "Left" || !gameRound.value.result) {
    bot.telegram.sendMessage(chatTelegramId.toString(), "Ошибочка вышла");
    return;
  }

  try {
    await payoutBet(roundId, gameRound.value.result);
  } catch (e) {
    console.log(e);
  }

  bot.telegram.sendMessage(
    chatTelegramId.toString(),
    `Выпало ${ROULETTE_BET_COLOR[gameRound.value.result.color]} ${gameRound.value.result.number}`,
  );
});

bot.launch();

console.log("The bot has launched");
