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
      include: {
        followee: true,
        follower: true,
      },
    });
  }

  async getFollowers(followeeId: number) {
    const followers = await this.getFollows(undefined, followeeId);
    return followers.map((follow) => follow.follower);
  }

  async getFollowees(followerId: number) {
    const followees = await this.getFollows(followerId, undefined);
    return followees.map((follow) => follow.followee);
  }

  async setFollow(followerId: number, followeeId: number) {
    if (followerId == followeeId)
      throw new BadRequestException('You cannot follow yourself');
    const block = await this.prisma.block.findFirst({
      where: { blockerId: followerId, blockedId: followeeId },
    });
    if (block) throw new BadRequestException('You cannot follow blocked users');
    const follow = await this.prisma.follow.findFirst({
      where: { followerId: followerId, followeeId: followeeId },
    });
    if (follow) throw new BadRequestException('You already followed this user');
    try {
      return await this.prisma.follow.create({
        data: { followerId: followerId, followeeId: followeeId },
      });
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async deleteFollow(followerId: number, followeeId: number) {
    const deleted = await this.prisma.follow.deleteMany({
      where: {
        followeeId: followeeId,
        followerId: followerId,
      },
    });
    if (!deleted) throw new BadRequestException('No entries are deleted');
    return deleted;
  }
}
