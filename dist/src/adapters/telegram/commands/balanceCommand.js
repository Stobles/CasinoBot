import { getBalanceStatus } from "@/entities/chat-user/index.js";
import { ensureSession } from "@/features/session/ensure-session.js";
export function registerBalanceCommand(bot) {
    bot.command("balance", async (ctx) => {
        const { chatUser } = await ensureSession(ctx);
        const balance = chatUser.balance;
        await ctx.reply(`💰 Баланс: ${balance} тугриков (${getBalanceStatus(balance)})`);
    });
}
//# sourceMappingURL=balanceCommand.js.map