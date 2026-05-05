import { getChatUsers } from "@/entities/chat-user/index.js";
import { getPayoutBetError, payoutBet } from "@/features/payout/payout-bet.js";
import {
  getResolveRoundError,
  resolveRound,
} from "@/features/round/resolve-round.js";
import { ROULETTE_COLORS_MAP } from "@/kernel/game/roulette/types.js";
import { bot } from "@/shared/lib/bot.js";
import type { IRoundEventService } from "@/shared/queues/game-round.js";

export function registerResolveRoundListener(eventService: IRoundEventService) {
  eventService.on("resolveRound", async ({ data }) => {
    const { roundId, chatTelegramId } = data;

    const gameRound = await resolveRound(roundId);

    if (gameRound.type === "Left") {
      const error = getResolveRoundError(gameRound);
      if (error) bot.telegram.sendMessage(chatTelegramId.toString(), error);
      return;
    }

    if (!gameRound.value.result) return;

    const payout = await payoutBet(roundId, gameRound.value.result);

    if (payout.type === "Left" && payout.value === "no-bets") {
      bot.telegram.sendMessage(
        chatTelegramId,
        `🎯 Выпало: ${gameRound.value.result.number} (${ROULETTE_COLORS_MAP[gameRound.value.result.color]})\nСтавок не было, деньги остаются у меня`,
      );
      return;
    }

    if (payout.type === "Left") {
      const error = getPayoutBetError(payout);
      if (error) bot.telegram.sendMessage(chatTelegramId.toString(), error);
      return;
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
        ? winnerUsers.map((b) => `- @${b.username}`).join("\n")
        : "Отсутствуют";

    const losersText =
      loserUsers.length > 0
        ? loserUsers.map((b) => `- @${b.username}`).join("\n")
        : "Отсутствуют";

    bot.telegram.sendMessage(
      chatTelegramId,
      `🎯 Выпало: ${gameRound.value.result.number} (${ROULETTE_COLORS_MAP[gameRound.value.result.color]})

🏆 Победители:
  ${winnersText}

💀 Проигравшие:
  ${losersText}`,
    );
  });
}
