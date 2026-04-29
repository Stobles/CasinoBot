export type BalanceStatus =
  (typeof BALANCE_STATUS)[keyof typeof BALANCE_STATUS];

const BALANCE_STATUS = {
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

export function getBalanceStatus(balance: number) {
  const statusEntries = Object.entries(BALANCE_STATUS)
    .map(([value, name]) => [Number(value), name] as const)
    .sort((a, b) => a[0] - b[0]);

  let current = statusEntries[0]![1];

  for (let [value, status] of statusEntries) {
    if (balance >= value) {
      current = status;
    } else {
      break;
    }
  }

  return current;
}
