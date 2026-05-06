import { pool, prisma } from "./db.js";

async function main() {
  const stoble = await prisma.user.findMany({
    where: { username: "Stoble" },
  });

  const prayfolove = await prisma.user.findMany({
    where: { username: "prayflove" },
  });

  const istayvoided = await prisma.user.findMany({
    where: { username: "istayvoided" },
  });

  const leaninthatea = await prisma.user.findMany({
    where: { username: "leaninthatea" },
  });

  await prisma.chatUser.updateMany({
    where: {
      userId: {
        in: [
          stoble[0]!.id,
          prayfolove[0]!.id,
          istayvoided[0]!.id,
          leaninthatea[0]!.id,
        ],
      },
    },
    data: {
      balance: 50000,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
