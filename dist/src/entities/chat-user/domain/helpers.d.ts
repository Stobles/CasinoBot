import type { ChatUser, User } from "@generated/prisma/client.js";
import { type ChatUserEntity } from "./types.js";
export declare const DAILY_PAYOUT = 500;
export declare function getBalanceStatus(balance: number): "На мели" | "Пытается" | "В теме" | "Чуть-чуть шарит" | "Уже опасен" | "Играет грязно" | "Держит линию" | "Не остановить" | "Деньги липнут" | "Ходячий банк";
export declare function formatChatUsersTop(top: ChatUserEntity[]): string;
export declare function buildChatUsersTop(chatUsers: ChatUserEntity[]): ChatUserEntity[];
export declare function mapChatUser(user: ChatUser & {
    user: User;
}): ChatUserEntity;
//# sourceMappingURL=helpers.d.ts.map