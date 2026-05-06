import type { ChatUserEntity } from "@/entities/chat-user/index.js";
import { type Either } from "@/shared/lib/either.js";
type DailyPayoutError = {
    type: "wrong-chat-user-id";
} | {
    type: "time-not-exceeded";
    remainingMs: number;
};
export declare function dailyPayout(chatUserId: string): Promise<Either<DailyPayoutError, ChatUserEntity>>;
export declare function getDailyPayoutError(result: Either<DailyPayoutError, ChatUserEntity>): string | null;
export {};
//# sourceMappingURL=daily-payout.d.ts.map