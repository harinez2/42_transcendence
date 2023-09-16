import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FriendsService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getFriends(userId: number) {
    const followedUsers = await this.prisma.follow.findMany({
      where: {
        followerId: userId,
      },
      select: {
        followee: true,
      },
    });

    const followedUserIds = followedUsers.map(
      (relation) => relation.followee.id,
    );

    const friends = await this.prisma.follow.findMany({
      where: {
        followeeId: userId,
        followerId: {
          in: followedUserIds,
        },
      },
      select: {
        follower: true,
      },
    });

    return friends.map((relation) => relation.follower);
  }
}
