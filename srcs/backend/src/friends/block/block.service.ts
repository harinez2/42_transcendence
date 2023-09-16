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
    });
  }

  async setBlock(blockerId: number, blockedId: number) {
    try {
      await this.prisma.follow.deleteMany({
        where: { followerId: blockerId, followeeId: blockedId },
      });
      return await this.prisma.block.create({
        data: { blockerId: blockerId, blockedId: blockedId },
      });
    } catch {
      throw new BadRequestException();
    }
  }

  deleteBlock(blockerId: number, blockedId: number) {
    return this.prisma.block.deleteMany({
      where: {
        blockerId: blockerId,
        blockedId: blockedId,
      },
    });
  }
}
