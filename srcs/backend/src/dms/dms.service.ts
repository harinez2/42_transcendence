import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDmChannelDto } from './dto/create-dm-channel.dto';
import { DmChannelInfoDto } from './dto/dm-channel-info.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageDto } from 'src/chats/dto/message.dto';
import { BlockService } from 'src/friends/block/block.service';

@Injectable()
export class DmsService {
  constructor(
    private prisma: PrismaService,
    private readonly blockService: BlockService,
  ) {}

  // channel operations

  async createChannel(createDmChannelDto: CreateDmChannelDto): Promise<number> {
    // すでにある場合はエラーにする
    let isAlreadyExists = true;
    try {
      await this.findBTwoUserId(
        createDmChannelDto.user1Id,
        createDmChannelDto.user2Id,
      );
    } catch (e) {
      if (e instanceof NotFoundException) {
        isAlreadyExists = false;
      }
    }
    if (isAlreadyExists) {
      throw new BadRequestException('The specified user is already added.');
    }

    // ルーム作成
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
    const blocklist = await this.blockService.getBlockeds(userId);
    const blockIdList = blocklist.map((user) => {
      return user.id;
    });
    try {
      const channel = await this.prisma.dmChannels.findMany({
        where: {
          AND: [
            { OR: [{ user1Id: userId }, { user2Id: userId }] },
            { user1Id: { notIn: blockIdList } },
            { user2Id: { notIn: blockIdList } },
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

  async findMessageById(messageId: number): Promise<MessageDto> {
    try {
      const message: MessageDto = await this.prisma.dmMessages.findUnique({
        where: { messageId: messageId },
        include: { sender: true },
      });
      if (!message) {
        throw new NotFoundException();
      }
      return message;
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  async findBTwoUserId(
    user1Id: number,
    user2Id: number,
  ): Promise<DmChannelInfoDto> {
    try {
      const channel = await this.prisma.dmChannels.findFirst({
        where: {
          OR: [
            { user1Id: user1Id, user2Id: user2Id },
            { user1Id: user2Id, user2Id: user1Id },
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
