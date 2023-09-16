import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FollowService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  getFollows(followerId: number | undefined, followeeId: number | undefined) {
    return this.prisma.follow.findMany({
      where: {
        followeeId: followeeId,
        followerId: followerId,
      },
    });
  }

  async setFollow(followerId: number, followeeId: number) {
    const block = await this.prisma.block.findFirst({
      where: { blockerId: followerId, blockedId: followeeId },
    });
    if (block) throw new BadRequestException('You cannot follow blocked users');
    try {
      return await this.prisma.follow.create({
        data: { followerId: followerId, followeeId: followeeId },
      });
    } catch {
      throw new BadRequestException();
    }
  }

  deleteFollow(followerId: number, followeeId: number) {
    return this.prisma.follow.deleteMany({
      where: {
        followeeId: followeeId,
        followerId: followerId,
      },
    });
  }
}
