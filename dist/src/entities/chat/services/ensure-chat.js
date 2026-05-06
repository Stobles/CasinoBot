import { prisma } from "@/shared/lib/db.js";
export async function ensureChat(data) {
    return await prisma.chat.upsert({
        where: { telegramId: data.telegramId },
        update: {},
        create: data,
    });
}
//# sourceMappingURL=ensure-chat.js.map