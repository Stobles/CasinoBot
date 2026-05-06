import type { GameRoundEntity, GameRoundTypes } from "../domain/types.js";
import { type Either } from "@/shared/lib/either.js";
export declare function createGameRound(type: GameRoundTypes, chatId: string, telegramChatId: bigint, duration?: number): Promise<Either<"game-open", GameRoundEntity>>;
//# sourceMappingURL=create-game-round.d.ts.map