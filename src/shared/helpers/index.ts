export function isCooldownPassed(
  lastExecutionAt: Date,
  cooldownMs: number,
  now: Date = new Date(),
): boolean {
  return now.getTime() - lastExecutionAt.getTime() >= cooldownMs;
}

export function getRemainingCooldownMs(
  lastExecutionAt: Date,
  cooldownMs: number,
  now: Date = new Date(),
): number {
  const elapsed = now.getTime() - lastExecutionAt.getTime();
  return Math.max(0, cooldownMs - elapsed);
}

export function formatMsToHM(ms: number): string {
  const totalSec = Math.ceil(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);

  return `${h}ч ${m}м`;
}
