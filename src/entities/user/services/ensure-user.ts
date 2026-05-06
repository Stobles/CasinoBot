import { prisma } from "@/shared/lib/db.js";
import type { CreateUserPayload, UserEntity } from "../domain/types.js";

export async function ensureUser(data: CreateUserPayload): Promise<UserEntity> {
  console.log(data.telegramId);
  return await prisma.user.upsert({
    where: { telegramId: data.telegramId },
    update: {},
    create: data,
  });
}
