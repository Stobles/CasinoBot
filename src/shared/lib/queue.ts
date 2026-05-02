import { Queue } from "bullmq";
import { Redis } from "ioredis";
import { variables } from "../config/variables.js";

export const connection = new Redis(variables.REDIS_URL, {
  maxRetriesPerRequest: null,
});

export const roundQueue = new Queue("round-queue", {
  connection,
});
