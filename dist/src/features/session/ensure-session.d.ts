import { Context } from "telegraf";
export declare function ensureSession(ctx: Context): Promise<{
    user: import("@/entities/user/index.js").UserEntity;
    chat: import("@/entities/chat/index.js").ChatEntity;
    chatUser: import("@/entities/chat-user/index.js").ChatUserEntity;
}>;
//# sourceMappingURL=ensure-session.d.ts.map