import type { BetData } from "@/entities/bet/index.js";
export declare function createBet(amount: number, roundId: string, chatUserId: string, payload: BetData): Promise<{
    status: import("../../../../generated/prisma/enums.js").BetStatus;
    id: string;
    createdAt: Date;
    type: import("../../../../generated/prisma/enums.js").GameType;
    roundId: string;
    chatUserId: string;
    amount: number;
    payload: import("@prisma/client/runtime/client").JsonValue;
}>;
//# sourceMappingURL=createBet.d.ts.map