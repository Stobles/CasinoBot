export function mapBetEntity(bet) {
    return {
        id: bet.id,
        roundId: bet.roundId,
        chatUserId: bet.chatUserId,
        type: bet.type,
        status: bet.status,
        payload: bet.payload,
        amount: bet.amount,
    };
}
export function splitRouletteBets(bets, result) {
    const winners = [];
    const losers = [];
    for (const bet of bets) {
        const data = bet.payload;
        let isWin = false;
        if (data.type === "color") {
            isWin = data.value === result.color;
        }
        if (data.type === "number") {
            isWin = data.value === result.number;
        }
        if (isWin) {
            winners.push(bet);
        }
        else {
            losers.push(bet);
        }
    }
    return { winners, losers };
}
//# sourceMappingURL=helpers.js.map