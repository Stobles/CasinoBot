import { Queue, Worker, Job } from "bullmq";
import { connection } from "@/shared/lib/queue.js";

export type RoundEvent = ResolveRoundEvent;

type Listener<T> = (data: T) => void;

type ResolveRoundEvent = {
  type: "resolveRound";
  data: { roundId: string; chatTelegramId: string };
};

class RoundEventService {
  private queue = new Queue("round", { connection });

  private handlers = new Map<RoundEvent["type"], Listener<any>>();

  // регистрация обработчиков (аналог addListener)
  on<T extends RoundEvent["type"]>(
    type: T,
    listener: Listener<Extract<RoundEvent, { type: T }>>,
  ) {
    this.handlers.set(type, listener);
  }

  // emit = кладём задачу в очередь
  async emit(event: RoundEvent, opts?: { delay?: number }) {
    console.log("Создан emit");
    await this.queue.add(event.type, event, {
      delay: opts?.delay || 0,
    });
  }

  // запуск worker (consumer)
  startWorker() {
    return new Worker(
      "round",
      async (job: Job<RoundEvent>) => {
        const handler = this.handlers.get(job.name as RoundEvent["type"]);

        if (!handler) {
          throw new Error(`No handler for ${job.name}`);
        }

        return handler(job.data);
      },
      { connection },
    );
  }
}

export const roundEvents = new RoundEventService();
