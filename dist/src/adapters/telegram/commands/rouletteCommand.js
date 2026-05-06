import { createGameRound } from "@/entities/game-round/services/create-game-round.js";
import { ensureSession } from "@/features/session/ensure-session.js";
import { ROULETTE_ROUND_TIME } from "@/kernel/game/roulette/const.js";
import path from "node:path";
export function registerRouletteCommand(bot) {
    bot.command("roll", async (ctx) => {
        const { chat } = await ensureSession(ctx);
        const gameRound = await createGameRound("ROULETTE", chat.id, chat.telegramId);
        if (gameRound.type === "Left") {
            await ctx.reply("❌ Рулетка уже создана в чате");
            return;
        }
        const rouletteImage = path.resolve(process.cwd(), "./src/shared/assets/roulette.jpg");
        try {
            await ctx.replyWithPhoto({ source: rouletteImage }, {
                caption: `🎰 Создана рулетка на ${ROULETTE_ROUND_TIME} секунд`,
            });
        }
        catch (error) {
            await ctx.reply(`❌ Непредвиденная ошибка ${error}`);
        }
    });
}
//# sourceMappingURL=rouletteCommand.js.map