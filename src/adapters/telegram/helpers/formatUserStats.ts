import { BALANCE_CURRENCY } from "@/shared/consts/const.js";

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
    `Проиграно: ${stats.lostAmount} тугриков.`,
  ].join("\n");
}
