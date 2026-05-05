import { buildChatUsersTop } from "@/entities/chat-user/domain/helpers.js";
import {
  getChatUsers,
  type ChatUserEntity,
} from "@/entities/chat-user/index.js";
import { left, right, type Either } from "@/shared/lib/either.js";

export async function getChatUsersTop(
  chatId: string,
): Promise<Either<"no-users", ChatUserEntity[]>> {
  const chatUsers = await getChatUsers({ chatId });

  if (!chatUsers.length) return left("no-users");

  const top = buildChatUsersTop(chatUsers);

  return right(top);
}
