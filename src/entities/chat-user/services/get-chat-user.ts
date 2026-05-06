import { prisma } from "@/shared/lib/db.js";
import type { Prisma } from "@generated/prisma/client.js";
import type { ChatUserEntity } from "../domain/types.js";
import { mapChatUser } from "../domain/helpers.js";

export async function getChatUser(
  where: Prisma.ChatUserWhereInput,
): Promise<(ChatUserEntity & { username: string | null }) | null> {
  const chatUser = await prisma.chatUser.findFirst({
    where,
    include: { user: true },
  });

  if (!chatUser) return null;

  return mapChatUser(chatUser);
}
