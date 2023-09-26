import { PrismaClient, User } from '@prisma/client';
import { Publicity, UserType } from '../src/chats/chats.interface';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function seedUser(username: string): Promise<User> {
  const lowerUsername = username.toLowerCase();
  return await prisma.user.create({
    data: {
      username: username,
      auth: {
        create: {
          email: `${lowerUsername}@example.com`,
          staff: true,
          password: await hash(lowerUsername, 10),
        },
      },
      profile: {
        create: { bio: `Hi! This is ${username}.` },
      },
    },
  });
}

async function seedFollow(follower: User, followee: User) {
  await prisma.follow.create({
    data: {
      followerId: follower.id,
      followeeId: followee.id,
    },
  });
}

async function seedBlock(blocker: User, blocked: User) {
  await prisma.block.create({
    data: {
      blockerId: blocker.id,
      blockedId: blocked.id,
    },
  });
}

async function seed() {
  // Dummy User
  const alice = await seedUser('Alice');
  const bob = await seedUser('Bob');
  const charlie = await seedUser('Charlie');
  const dave = await seedUser('Dave');

  // Dummy Friend
  /**
   *   | A | B | C | D
   * --+---+---+---+---
   * A | X | F |   | b
   * B | F | X |   | b
   * C | f |   | X | B
   * D | f |   | B | X
   * ex) Alice blocks Dave and Dave follows Alice.
   */
  seedFollow(alice, bob);
  seedBlock(alice, dave);
  seedFollow(bob, alice);
  seedBlock(bob, dave);
  seedFollow(charlie, alice);
  seedBlock(charlie, dave);
  seedFollow(dave, alice);
  seedBlock(dave, charlie);

  // ダミーユーザー作成
  const user1 = await prisma.user.create({
    data: {
      username: 'user01',
      auth: {
        create: {
          email: 'user01@example.com',
          staff: true,
          password: await hash('password1', 10),
        },
      },
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
