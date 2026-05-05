import type { ChatUser, User } from "@generated/prisma/client.js";
import { BALANCE_STATUS, type ChatUserEntity } from "./types.js";

export const DAILY_PAYOUT = 500;

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

export function formatChatUsersTop(top: ChatUserEntity[]): string {
  return top
    .map((u, i) => `${i + 1}\\. *@${u.username}* — *${u.balance} тугриков*`)
    .join("\n");
}

export function buildChatUsersTop(
  chatUsers: ChatUserEntity[],
): ChatUserEntity[] {
  return [...chatUsers].sort((a, b) => b.balance - a.balance);
}

export function mapChatUser(user: ChatUser & { user: User }): ChatUserEntity {
  return {
    id: user.id,
    balance: user.balance,
    dailyAt: user.dailyAt,
    username: user.user.username,
    chatId: user.chatId,
    userId: user.userId,
  };
}
