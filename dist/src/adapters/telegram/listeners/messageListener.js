import { ensureSession } from "@/features/session/ensure-session.js";
export function registerMessageListener(bot) {
    bot.on("message", (ctx, next) => {
        if (!ctx.from || !ctx.chat)
            next();
        const {} = ensureSession(ctx);
        next();
    });
}
//# sourceMappingURL=messageListener.js.map