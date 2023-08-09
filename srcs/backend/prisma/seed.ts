import { PrismaClient } from '@prisma/client';
import { Publicity, UserType } from '../src/chats/chats.interface';

const prisma = new PrismaClient();

async function main() {
  // ダミーユーザー作成
  await prisma.user.create({
    data: {
      username: 'user01',
      email: 'user01@example.com',
    },
  });

  // generalチャンネル作成
  await prisma.chatChannels.create({
    data: {
      channelName: 'general',
      createdAt: new Date(),
      channelType: Publicity.PUBLIC,
      hashedPassword: '',
    },
  });

  // generalチャンネルのユーザ設定
  await prisma.chatChannelUsers.create({
    data: {
      channelId: 1,
      userId: 1,
      type: UserType.OWNER,
    },
  });
  await prisma.chatChannelUsers.create({
    data: {
      channelId: 1,
      userId: 1,
      type: UserType.ADMIN,
    },
  });
  await prisma.chatChannelUsers.create({
    data: {
      channelId: 1,
      userId: 1,
      type: UserType.USER,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
