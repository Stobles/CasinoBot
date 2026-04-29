import type { ChatUserEntity } from "@/entities/chat-user/index.js";
import { prisma } from "../../shared/lib/db.js";

export async function ensureChatUser(
  userId: string,
  chatId: string,
): Promise<ChatUserEntity> {
  return await prisma.chatUser.upsert({
    where: { userId_chatId: { userId, chatId } },
    update: {},
    create: { userId, chatId },
  });
}
