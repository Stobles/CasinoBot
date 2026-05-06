import { formatChatUsersTop } from "./formatChatUsersTop.js";
import { BALANCE_CURRENCY, DAILY_PAYOUT } from "@/shared/consts/const.js";
import { getBalanceStatus } from "@/entities/chat-user/index.js";
import { ROULETTE_ROUND_TIME } from "@/kernel/game/roulette/const.js";

export const messages = {
  common: {
    errors: {
      unknown: "Произошла ошибка",
      forbidden: "Недостаточно прав",
    },
  },

  user: {
    created: "Пользователь создан",
    balance: (username: string, amount: number) =>
      `💰 Баланс @${username}: ${amount}${BALANCE_CURRENCY} (${getBalanceStatus(amount)})`,
  },

  betting: {
    noRound: "❌ В чате не создана рулетка",
    placed: (
      username: string,
      number: number | null,
      color: string,
      amount: number,
    ) =>
      `@${username} сделал ставку на ${number ? `${number} ` : ""}${color} в размере ${amount}${BALANCE_CURRENCY}`,
    invalidAmount: "Некорректная сумма ставки",
  },

  daily: `💸 Лови монету, братик (+${DAILY_PAYOUT}${BALANCE_CURRENCY})`,

  stats: {
    topUsers: (users: { username: string; balance: number }[]) =>
      `Топ пользователей казика в чате:\n\n ${formatChatUsersTop(users)}\n\n`,
    userStat: formatUserStats,
  },

  roulette: {
    created: `🎰 Создана рулетка на ${ROULETTE_ROUND_TIME} секунд`,
    alreadyCreated: "❌ Рулетка уже создана в чате",
    error: (error: unknown) => `❌ Непредвиденная ошибка ${error}`,
    finished: (result: string) => `Раунд завершён: ${result}`,
  },
} as const;

export function formatUserStats(stats: {
  balance: number;
  winRate: number;
  totalBets: number;
  wonBets: number;
  wonAmount: number;
  lostAmount: number;
}) {
  return [
    `Баланс: ${stats.balance}`,
    ``,
    `Процент выигрышей: ${stats.winRate.toFixed(2)}%.`,
    `Поставлено ставок: ${stats.totalBets}.`,
    `Выиграно ставок: ${stats.wonBets}.`,
    `Выиграно: ${stats.wonAmount} ${BALANCE_CURRENCY}.`,
    `Проиграно: ${stats.lostAmount} ${BALANCE_CURRENCY}.`,
  ].join("\n");
}
