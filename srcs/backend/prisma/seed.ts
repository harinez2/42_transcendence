import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword1 = await hash('password1', 10);
  const user1 = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      username: 'Alice',
      staff: true,
      password: hashedPassword1,
      profile: {
        create: { bio: 'Hi! This is Alice.' },
      },
    },
  });
  const hashedPassword2 = await hash('password2', 10);
  const user2 = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      username: 'Bob',
      staff: true,
      password: hashedPassword2,
      profile: {
        create: { bio: 'Hi! This is Bob.' },
      },
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
