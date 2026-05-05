import { prisma } from "@/shared/lib/db.js";
import type { Prisma } from "@generated/prisma/client.js";
import type { ChatUserEntity } from "../domain/types.js";

export async function getChatUsers(
  where: Prisma.ChatUserWhereInput,
): Promise<(ChatUserEntity & { username: string | null })[]> {
  const chatUser = await prisma.chatUser.findMany({
    where,
    include: { user: true },
  });

  return chatUser.map((item) => ({
    id: item.id,
    chatId: item.chatId,
    userId: item.userId,
    username: item.user.username,
    balance: item.balance,
  }));
}
