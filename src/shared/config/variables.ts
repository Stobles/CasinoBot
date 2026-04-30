import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  BOT_TOKEN: z.string().min(1, "BOT_TOKEN is required"),
  REDIS_URL: z.string().min(1, "REDIS_URL must be declared"),
});

const env = envSchema.safeParse({
  BOT_TOKEN: process.env.BOT_TOKEN,
  REDIS_URL: process.env.REDIS_URL,
});

if (!env.success) {
  console.error("Invalid environment variables:", env.error.format());
  throw new Error("Invalid environment variables");
}

export const variables = env.data;
