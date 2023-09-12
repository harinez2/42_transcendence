import { PrismaClient } from '@prisma/client';
import { Publicity, UserType } from '../src/chats/chats.interface';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {
  // ダミーユーザー作成
  const user1 = await prisma.user.create({
    data: {
      username: 'user01',
      email: 'user01@example.com',
      staff: true,
      password: await hash('password1', 10),
      profile: {
        create: { bio: 'Hi! This is user01.' },
      },
    },
  });

  // generalチャンネル作成
  const channel = await prisma.chatChannels.create({
    data: {
      channelName: 'general',
      createdAt: new Date(),
      channelType: Publicity.PUBLIC,
      hashedPassword: '',
    },
  });
  if (!user1 || !channel) return;

  // generalチャンネルのユーザ権限設定
  await prisma.chatChannelUsers.create({
    data: {
      channelId: channel.channelId,
      userId: user1.id,
      type: UserType.OWNER,
    },
  });
  await prisma.chatChannelUsers.create({
    data: {
      channelId: channel.channelId,
      userId: user1.id,
      type: UserType.ADMIN,
    },
  });
  await prisma.chatChannelUsers.create({
    data: {
      channelId: channel.channelId,
      userId: user1.id,
      type: UserType.USER,
    },
  });

  console.log({ user1 });
  console.log({ channel });
}

async function main() {
  const testuser = await prisma.user.findMany({
    where: { username: 'user01' },
  });
  if (testuser.length !== 0) {
    console.log('Test data already seeded');
  } else {
    console.log('Seeding ...');
    await seed();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
