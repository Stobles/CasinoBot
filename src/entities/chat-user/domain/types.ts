export type BalanceStatus =
  (typeof BALANCE_STATUS)[keyof typeof BALANCE_STATUS];

export const BALANCE_STATUS = {
  0: "На мели",
  100: "Пытается",
  300: "В теме",
  500: "Чуть-чуть шарит",
  1000: "Уже опасен",
  2500: "Играет грязно",
  5000: "Держит линию",
  10000: "Не остановить",
  25000: "Деньги липнут",
  50000: "Ходячий банк",
} as const;

export type ChatUserEntity = {
  id: string;
  chatId: string;
  userId: string;
  balance: number;
  username: string;
  dailyAt: Date | null;
};
