import type { Prisma } from "@generated/prisma/client.js";
import type { ChatUserEntity } from "../domain/types.js";
export declare function getChatUser(where: Prisma.ChatUserWhereInput): Promise<(ChatUserEntity & {
    username: string | null;
}) | null>;
//# sourceMappingURL=get-chat-user.d.ts.map