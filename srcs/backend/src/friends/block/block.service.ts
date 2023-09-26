import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BlockService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  getBlocks(blockerId: number | undefined, blockedId: number | undefined) {
    return this.prisma.block.findMany({
      where: {
        blockerId: blockerId,
        blockedId: blockedId,
      },
      include: {
        blocker: true,
        blocked: true,
      },
    });
  }

  async getBlockers(blockedId: number) {
    const blockers = await this.getBlocks(undefined, blockedId);
    return blockers.map((block) => block.blocker);
  }

  async getBlockeds(blockedId: number) {
    const blockeds = await this.getBlocks(blockedId, undefined);
    return blockeds.map((block) => block.blocked);
  }

  async setBlock(blockerId: number, blockedId: number) {
    if (blockerId == blockedId)
      throw new BadRequestException('You cannot block yourself');
    try {
      await this.prisma.follow.deleteMany({
        where: { followerId: blockerId, followeeId: blockedId },
      });
      const block = await this.prisma.block.findFirst({
        where: { blockerId: blockerId, blockedId: blockedId },
      });
      if (block) throw new BadRequestException('You already blocked this user');
      return await this.prisma.block.create({
        data: { blockerId: blockerId, blockedId: blockedId },
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async deleteBlock(blockerId: number, blockedId: number) {
    const deleted = await this.prisma.block.deleteMany({
      where: {
        blockerId: blockerId,
        blockedId: blockedId,
      },
    });
    if (!deleted) throw new BadRequestException('No entries are deleted');
    return deleted;
  }
}
