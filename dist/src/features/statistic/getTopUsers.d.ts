import { type ChatUserEntity } from "@/entities/chat-user/index.js";
import { type Either } from "@/shared/lib/either.js";
export declare function getChatUsersTop(chatId: string): Promise<Either<"no-users", ChatUserEntity[]>>;
//# sourceMappingURL=getTopUsers.d.ts.map