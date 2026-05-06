import { pool, prisma } from "./db.js";

function getArg(name: string): string | undefined {
  const argv = process.argv;

  const index = argv.findIndex((a) => a === `--${name}`);
  if (index !== -1) {
    return argv[index + 1];
  }

  const withEquals = argv.find((a) => a.startsWith(`--${name}=`));

  return withEquals?.split("=")[1];
}

async function main() {
  const balanceRaw = getArg("balance");

  if (!balanceRaw || !/^\d+$/.test(balanceRaw)) {
    throw new Error("Используй: npx prisma db seed -- -- --balance 5000");
  }

  const balance = Number(balanceRaw);

  const usernamesRaw = getArg("usernames");

  if (usernamesRaw && !/^[^,\s]+(,[^,\s]+)*$/.test(usernamesRaw)) {
    throw new Error("usernames должны быть такого вида: stoble,prayflove,...");
  }

  const usernames = usernamesRaw
    ? usernamesRaw.split(",")
    : ["Stoble", "prayflove", "istayvoided", "leaninthatea"];

  console.log(usernames);

  const users = await prisma.user.findMany({
    where: {
      username: {
        in: usernames,
      },
    },
    select: { id: true },
  });

  if (users.length === 0) {
    throw new Error("Пользователи не найдены");
  }

  await prisma.chatUser.updateMany({
    where: {
      userId: {
        in: users.map((u) => u.id),
      },
    },
    data: {
      balance,
    },
  });

  console.log(`Баланс обновлён: ${balance}`);
}

main().finally(async () => {
  await prisma.$disconnect();
  await pool.end();
});
