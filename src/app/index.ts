import {
  registerMessageListener,
  type TelegramModule,
} from "../adapters/telegram/index.js";
import { registerBalanceCommand } from "@/adapters/telegram/commands/balanceCommand.js";
import { registerRouletteCommand } from "@/adapters/telegram/commands/rouletteCommand.js";
import { roundEvents } from "@/shared/queues/game-round.js";
import { bot } from "@/shared/lib/bot.js";
import { registerBetCommand } from "@/adapters/telegram/commands/betCommand.js";

import { resolveRound } from "@/features/round/resolve-round.js";
import { payoutBet } from "@/features/payout/payout-bet.js";

import "dotenv/config";
import { getChatUsers } from "@/entities/chat-user/index.js";

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
    const payout = await payoutBet(roundId, gameRound.value.result);

    if (payout.type === "Left") {
      return bot.telegram.sendMessage(
        chatTelegramId.toString(),
        "Ошибочка вышла 2",
      );
    }

    const { winners, losers } = payout.value;

    const winnerUsers = await getChatUsers({
      id: { in: winners.map((item) => item.chatUserId) },
    });

    const loserUsers = await getChatUsers({
      id: { in: losers.map((item) => item.chatUserId) },
    });

    const winnersText =
      winnerUsers.length > 0
        ? winnerUsers.map((b) => `• ${b.username}`).join("\n")
        : "нет";

    const losersText =
      loserUsers.length > 0
        ? loserUsers.map((b) => `• ${b.username}`).join("\n")
        : "нет";

    return `🎯 Выпало: ${gameRound.value.result.number} (${gameRound.value.result.color})

🏆 Победители:
${winnersText}

💀 Проигравшие:
${losersText}`;
  } catch (e) {
    console.log(e);
  }
});

bot.launch();

console.log("The bot has launched");
