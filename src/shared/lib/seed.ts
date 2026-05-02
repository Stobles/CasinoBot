import { pool, prisma } from "./db.js";

async function main() {
  const stoble = await prisma.user.findMany({
    where: { username: "Stoble" },
  });

  await prisma.chatUser.updateMany({
    where: { userId: stoble[0]!.id },
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
