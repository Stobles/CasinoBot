import { variables } from "@/shared/config/variables.js";
import { Telegraf } from "telegraf";
import {
  registerMessageListener,
  type TelegramModule,
} from "../adapters/telegram/index.js";
import { registerBalanceCommand } from "@/adapters/telegram/commands/balanceCommand.js";
import { registerRouletteCommand } from "@/adapters/telegram/commands/rouletteCommand.js";
import { roundEvents } from "@/shared/queues/game-round.js";
import { bot } from "@/shared/lib/bot.js";
import { resolveGameRound } from "@/features/game-round/resolve-game-round.js";
import { ensureChat } from "@/features/chat/ensure-chat.js";

const modules: TelegramModule[] = [
  registerBalanceCommand,
  registerRouletteCommand,
  registerMessageListener,
];

modules.forEach((m) => m(bot));

roundEvents.startWorker();

roundEvents.on("resolveRound", async ({ data }) => {
  console.log("Ставка закрыта");
  await resolveGameRound(data.roundId);

  bot.telegram.sendMessage(data.chatTelegramId.toString(), "Ставка закрыта");
});

bot.launch();

console.log("The bot has launched");
