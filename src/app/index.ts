import {
  registerMessageListener,
  type TelegramModule,
} from "../adapters/telegram/index.js";
import { registerBalanceCommand } from "@/adapters/telegram/commands/balanceCommand.js";
import { registerRouletteCommand } from "@/adapters/telegram/commands/rouletteCommand.js";
import { roundEvents } from "@/shared/queues/game-round.js";
import { bot } from "@/shared/lib/bot.js";
import { resolveGameRound } from "@/entities/game-round/services/resolve-game-round.js";
import { registerBetCommand } from "@/adapters/telegram/commands/betCommand.js";

import "dotenv/config";
import { resolveRound } from "@/features/round/resolve-round.js";

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

  await resolveRound(roundId);

  bot.telegram.sendMessage(chatTelegramId.toString(), "Ставка закрыта");
});

bot.launch();

console.log("The bot has launched");
