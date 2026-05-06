export type UserEntity = {
    id: string;
    telegramId: bigint;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
};
export type CreateUserPayload = {
    telegramId: number;
    username?: string | null;
    firstName?: string;
    lastName?: string | null;
};
//# sourceMappingURL=types.d.ts.map