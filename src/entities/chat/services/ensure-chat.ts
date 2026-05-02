import { prisma } from "@/shared/lib/db.js";
import type { ChatEntity, CreateChatPayload } from "../domain/types.js";

export async function ensureChat(data: CreateChatPayload): Promise<ChatEntity> {
  return await prisma.chat.upsert({
    where: { telegramId: data.telegramId },
    update: {},
    create: data,
  });
}
