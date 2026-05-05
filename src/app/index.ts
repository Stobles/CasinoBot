import {
  registerBalanceCommand,
  registerBetCommand,
  registerDailyCommand,
  registerMessageListener,
  registerRouletteCommand,
  type TelegramModule,
} from "../adapters/telegram/index.js";
import { roundEvents } from "@/shared/queues/game-round.js";
import { bot } from "@/shared/lib/bot.js";

import type { RoundServiceModule } from "@/adapters/roundService/types/index.js";
import { registerResolveRoundListener } from "@/adapters/roundService/index.js";

import "dotenv/config";

const telegramModules: TelegramModule[] = [
  registerBalanceCommand,
  registerRouletteCommand,
  registerMessageListener,
  registerDailyCommand,
  registerBetCommand,
];

const roundServiceModules: RoundServiceModule[] = [
  registerResolveRoundListener,
];

telegramModules.forEach((m) => m(bot));
roundServiceModules.forEach((m) => m(roundEvents));

roundEvents.startWorker();
bot.launch();

console.log("The bot has launched");
