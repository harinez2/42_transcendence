import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // test user 1
  const hashedPassword1 = await hash('password1', 10);
  const user1 = await prisma.users.create({
    data: {
      user_id: 'Alice',
      nickname: 'Alice',
      // password: hashedPassword1,
    },
  });

  // test user 2
  const hashedPassword2 = await hash('password2', 10);
  const user2 = await prisma.users.create({
    data: {
      user_id: 'Bob',
      nickname: 'Bob',
      // password: hashedPassword2,
    },
  });

  console.log({ user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
