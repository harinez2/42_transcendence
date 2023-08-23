import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDmChannelDto } from './dto/create-dm-channel.dto';
import { DmChannelInfoDto } from './dto/dm-channel-info.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DmsService {
  constructor(private prisma: PrismaService) {}

  // channel operations

  async createChannel(createDmChannelDto: CreateDmChannelDto): Promise<number> {
    try {
      const createdChannel = await this.prisma.dmChannels.create({
        data: createDmChannelDto,
      });

      return createdChannel.channelId;
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  async findByUserId(userId: number): Promise<DmChannelInfoDto[]> {
    try {
      const channel = await this.prisma.dmChannels.findMany({
        where: {
          OR: [
            { user1Id: userId },
            { user2Id: userId },
          ],
        },
        include: {
          user1: true,
          user2: true,
        },
      });
      if (!channel) {
        throw new NotFoundException();
      }
      return channel;
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }
}
