import { prisma } from "@/shared/lib/db.js";
export async function ensureUser(data) {
    return await prisma.user.upsert({
        where: { telegramId: data.telegramId },
        update: {},
        create: data,
    });
}
//# sourceMappingURL=ensure-user.js.map