import { prisma } from "@/shared/lib/db.js";
import type { ChatUserEntity } from "../domain/types.js";
import { mapChatUser } from "../domain/helpers.js";

export async function ensureChatUser(
  userId: string,
  chatId: string,
): Promise<ChatUserEntity> {
  return mapChatUser(
    await prisma.chatUser.upsert({
      where: { userId_chatId: { userId, chatId } },
      update: {},
      create: { userId, chatId },
      include: { user: true },
    }),
  );
}
