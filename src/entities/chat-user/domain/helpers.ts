import { BALANCE_STATUS } from "./types.js";

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
