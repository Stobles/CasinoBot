import { variables } from "@/shared/config/variables.js";
import { Telegraf } from "telegraf";
import {
  registerMessageListener,
  type TelegramModule,
} from "../adapters/telegram/index.js";

const bot = new Telegraf(variables.BOT_TOKEN);

const modules: TelegramModule[] = [registerMessageListener];

modules.forEach((m) => m(bot));

bot.on("message", (ctx) => {
  console.log("Прием");
});

bot.launch();

console.log("The bot has launched");
