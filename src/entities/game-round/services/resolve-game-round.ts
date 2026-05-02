import { prisma } from "@/shared/lib/db.js";

export async function resolveGameRound(roundId: string) {
  const gameRound = await prisma.gameRound.findFirst({
    where: {
      id: roundId,
    },
  });

  if (!gameRound || !(gameRound.status === "OPEN")) {
    throw new Error("The game is already resolved or doesn't exist");
  }

  await prisma.gameRound.update({
    where: { id: roundId },
    data: { status: "RESOLVED" },
  });
}
