import { prisma } from "../../shared/lib/db.js";

export async function ensureChatUser(userId: string, chatId: string) {
  return await prisma.chatUser.upsert({
    where: { userId_chatId: { userId, chatId } },
    update: {},
    create: { userId, chatId },
  });
}
