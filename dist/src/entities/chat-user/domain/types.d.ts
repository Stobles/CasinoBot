export type BalanceStatus = (typeof BALANCE_STATUS)[keyof typeof BALANCE_STATUS];
export declare const BALANCE_STATUS: {
    readonly 0: "На мели";
    readonly 100: "Пытается";
    readonly 300: "В теме";
    readonly 500: "Чуть-чуть шарит";
    readonly 1000: "Уже опасен";
    readonly 2500: "Играет грязно";
    readonly 5000: "Держит линию";
    readonly 10000: "Не остановить";
    readonly 25000: "Деньги липнут";
    readonly 50000: "Ходячий банк";
};
export type ChatUserEntity = {
    id: string;
    chatId: string;
    userId: string;
    balance: number;
    username: string | null;
    dailyAt: Date | null;
};
//# sourceMappingURL=types.d.ts.map