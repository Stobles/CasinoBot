export function isCooldownPassed(lastExecutionAt, cooldownMs, now = new Date()) {
    return now.getTime() - lastExecutionAt.getTime() >= cooldownMs;
}
export function getRemainingCooldownMs(lastExecutionAt, cooldownMs, now = new Date()) {
    const elapsed = now.getTime() - lastExecutionAt.getTime();
    return Math.max(0, cooldownMs - elapsed);
}
export function formatMsToHM(ms) {
    const totalSec = Math.ceil(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    return `${h}ч ${m}м`;
}
//# sourceMappingURL=index.js.map