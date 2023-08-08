import { Injectable } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { ChannelInfoDto } from './dto/channel-info.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class ChatsService {
  constructor(private prisma: PrismaService) {}

  async createChannel(createChannelDto: CreateChannelDto): Promise<ChannelInfoDto> {
    const hashedPassword
        = createChannelDto.password
          ? await hash(createChannelDto.password, 10) as string : null;
  
    try {
      const createdPost = await this.prisma.chatChannels.create({
        data: {
          owner: createChannelDto.owner,
          admin: createChannelDto.owner,
          createdAt: new Date(),
          channelType: createChannelDto.channelType,
          hashedPassword: hashedPassword,
        },
      });
      return createdPost;
    } catch (error) {
      console.error('Failed to create channel.', error);
      throw error;
    }
  }

  async findAllChannel(): Promise<ChannelInfoDto[]> {
    const posts = await this.prisma.chatChannels.findMany();
    return posts;
  }

  async findById(channel_id: string): Promise<ChannelInfoDto> {
    const post = await this.prisma.chatChannels.findUnique({
      where: { channel_id: Number(channel_id) },
    });
    if (post) {
      return post;
    }
    return undefined;
  }

}
