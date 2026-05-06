import type { Prisma } from "@generated/prisma/client.js";
export declare function updateChatUser(where: Prisma.ChatUserWhereUniqueInput, data: Prisma.ChatUserUpdateInput): Promise<{
    id: string;
    chatId: string;
    userId: string;
    username: string | null;
    balance: number;
    dailyAt: Date | null;
}>;
//# sourceMappingURL=update-chat-user.d.ts.map