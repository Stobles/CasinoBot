import { Worker } from "bullmq";
export type RoundEvent = ResolveRoundEvent;
export interface IRoundEventService {
    on<T extends RoundEvent["type"]>(type: T, listener: Listener<Extract<RoundEvent, {
        type: T;
    }>>): void;
    emit(event: RoundEvent, opts?: {
        delay?: number;
    }): Promise<void>;
}
type Listener<T> = (data: T) => void;
type ResolveRoundEvent = {
    type: "resolveRound";
    data: {
        roundId: string;
        chatTelegramId: string;
    };
};
declare class RoundEventService implements IRoundEventService {
    private queue;
    private handlers;
    on<T extends RoundEvent["type"]>(type: T, listener: Listener<Extract<RoundEvent, {
        type: T;
    }>>): void;
    emit(event: RoundEvent, opts?: {
        delay?: number;
    }): Promise<void>;
    startWorker(): Worker<ResolveRoundEvent, any, string>;
}
export declare const roundEvents: RoundEventService;
export {};
//# sourceMappingURL=game-round.d.ts.map