import { BALANCE_CURRENCY } from "@/shared/consts/const.js";

export function formatChatUsersTop(
  top: { username: string; balance: number }[],
): string {
  return top
    .map(
      (u, i) =>
        `${i + 1}\\. *@${u.username}* — *${u.balance} ${BALANCE_CURRENCY}*`,
    )
    .join("\n");
}
