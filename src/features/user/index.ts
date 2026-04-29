import type {
  CreateUserPayload,
  UserEntity,
} from "../../entities/user/index.js";
import { prisma } from "../../shared/lib/db.js";

export async function ensureUser(data: CreateUserPayload): Promise<UserEntity> {
  return await prisma.user.upsert({
    where: { telegramId: data.telegramId },
    update: {},
    create: data,
  });
}
