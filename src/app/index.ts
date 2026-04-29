import { variables } from "@/shared/config/variables.js";
import { Telegraf } from "telegraf";
import {
  registerMessageListener,
  type TelegramModule,
} from "../adapters/telegram/index.js";
import { registerBalanceCommand } from "@/adapters/telegram/commands/balanceCommand.js";

const bot = new Telegraf(variables.BOT_TOKEN);

const modules: TelegramModule[] = [
  registerBalanceCommand,
  registerMessageListener,
];

modules.forEach((m) => m(bot));

bot.launch();

console.log("The bot has launched");
