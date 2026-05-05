import { DAILY_PAYOUT } from "@/entities/chat-user/domain/helpers.js";
import type { ChatUserEntity } from "@/entities/chat-user/index.js";
import { getChatUser } from "@/entities/chat-user/services/get-chat-user.js";
import { updateChatUser } from "@/entities/chat-user/services/update-chat-user.js";
import {
  formatMsToHM,
  getRemainingCooldownMs,
  isCooldownPassed,
} from "@/shared/helpers/index.js";
import { left, matchEither, right, type Either } from "@/shared/lib/either.js";

type DailyPayoutError =
  | { type: "wrong-chat-user-id" }
  | { type: "time-not-exceeded"; remainingMs: number };

export async function dailyPayout(
  chatUserId: string,
): Promise<Either<DailyPayoutError, ChatUserEntity>> {
  const chatUser = await getChatUser({ id: chatUserId });

  if (!chatUser) return left({ type: "wrong-chat-user-id" });

  const canGetDaily =
    !chatUser.dailyAt ||
    isCooldownPassed(chatUser.dailyAt, 12 * 60 * 60 * 1000);

  if (canGetDaily) {
    return right(
      await updateChatUser(
        { id: chatUserId },
        { balance: { increment: DAILY_PAYOUT }, dailyAt: new Date() },
      ),
    );
  }

  return left({
    type: "time-not-exceeded",
    remainingMs: getRemainingCooldownMs(chatUser.dailyAt!, 12 * 60 * 60 * 1000),
  });
}

export function getDailyPayoutError(
  result: Either<DailyPayoutError, ChatUserEntity>,
) {
  return matchEither(result, {
    right: () => null,
    left: (e) => {
      switch (e.type) {
        case "wrong-chat-user-id":
          return "💩 Разраб чет наговнокодил\\.";

        case "time-not-exceeded":
          return `❌️ Тебе еще рано\\. Осталось: *${formatMsToHM(e.remainingMs)}*\\.`;
      }
    },
  });
}
