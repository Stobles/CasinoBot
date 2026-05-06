import { prisma } from "@/shared/lib/db.js";
import type { Prisma } from "@generated/prisma/client.js";
import { mapChatUser } from "../domain/helpers.js";

export async function updateChatUser(
  where: Prisma.ChatUserWhereUniqueInput,
  data: Prisma.ChatUserUpdateInput,
) {
  const chatUser = await prisma.chatUser.update({
    where,
    data,
    include: { user: true },
  });

  return mapChatUser(chatUser);
}
