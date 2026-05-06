import { Queue, Worker, Job } from "bullmq";
import { connection } from "@/shared/lib/queue.js";
class RoundEventService {
    queue = new Queue("round", { connection });
    handlers = new Map();
    on(type, listener) {
        this.handlers.set(type, listener);
    }
    async emit(event, opts) {
        console.log("Создан emit");
        await this.queue.add(event.type, event, {
            delay: opts?.delay || 0,
        });
    }
    startWorker() {
        return new Worker("round", async (job) => {
            const handler = this.handlers.get(job.name);
            if (!handler) {
                throw new Error(`No handler for ${job.name}`);
            }
            return handler(job.data);
        }, { connection });
    }
}
export const roundEvents = new RoundEventService();
//# sourceMappingURL=game-round.js.map