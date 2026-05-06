import type { Prisma } from "@generated/prisma/client.js";
import type { ChatUserEntity } from "../domain/types.js";
export declare function getChatUsers(where: Prisma.ChatUserWhereInput): Promise<(ChatUserEntity & {
    username: string | null;
})[]>;
//# sourceMappingURL=get-chat-users.d.ts.map