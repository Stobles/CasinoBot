export function getEndOfGameRound(durationSeconds) {
    return new Date(Date.now() + durationSeconds * 1000);
}
export function mapGameRound(db) {
    if (db.gameType === "ROULETTE") {
        return {
            ...db,
            result: db.result,
        };
    }
    throw new Error(`Unsupported gameType: ${db.gameType}`);
}
//# sourceMappingURL=helpers.js.map