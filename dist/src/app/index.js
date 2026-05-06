import { registerBalanceCommand, registerBetCommand, registerDailyCommand, registerMessageListener, registerRouletteCommand, registerTopCommand, } from "../adapters/telegram/index.js";
import { roundEvents } from "@/shared/queues/game-round.js";
import { bot } from "@/shared/lib/bot.js";
import { registerResolveRoundListener } from "@/adapters/roundService/index.js";
import "dotenv/config";
const telegramModules = [
    registerBalanceCommand,
    registerRouletteCommand,
    registerMessageListener,
    registerDailyCommand,
    registerBetCommand,
    registerTopCommand,
];
const roundServiceModules = [
    registerResolveRoundListener,
];
telegramModules.forEach((m) => m(bot));
roundServiceModules.forEach((m) => m(roundEvents));
roundEvents.startWorker();
bot.launch();
console.log("The bot has launched");
//# sourceMappingURL=index.js.map