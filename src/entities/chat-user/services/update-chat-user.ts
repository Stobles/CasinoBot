import { prisma } from "@/shared/lib/db.js";
import type { Prisma } from "@generated/prisma/client.js";

export async function updateChatUser(
  where: Prisma.ChatUserWhereUniqueInput,
  data: Prisma.ChatUserUpdateInput,
) {
  const chatUser = await prisma.chatUser.update({
    where,
    data,
    include: { user: true },
  });

  return {
    id: chatUser.id,
    chatId: chatUser.chatId,
    userId: chatUser.userId,
    username: chatUser.user.username,
    balance: chatUser.balance,
    dailyAt: chatUser.dailyAt,
  };
}
