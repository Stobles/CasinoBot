import type {
  ChatEntity,
  CreateChatPayload,
} from "../../entities/chat/index.js";
import { prisma } from "../../shared/lib/db.js";

export async function ensureChat(data: CreateChatPayload): Promise<ChatEntity> {
  return await prisma.chat.upsert({
    where: { telegramId: data.telegramId },
    update: {},
    create: data,
  });
}
