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
          channelName: createChannelDto.channelName,
          owner: createChannelDto.owner,
          admin: createChannelDto.owner,
          createdAt: new Date(),
          channelType: createChannelDto.channelType,
          hashedPassword: hashedPassword,
        },
      });
      return this.createChannelInfoDto(createdPost);
    } catch (error) {
      console.error('Failed to create channel.', error);
      throw error;
    }
  }

  async findAllChannel(): Promise<ChannelInfoDto[]> {
    const posts = await this.prisma.chatChannels.findMany();
    return posts.map((post) => this.createChannelInfoDto(post));
  }

  async findById(channelId: number): Promise<ChannelInfoDto> {
    const post = await this.prisma.chatChannels.findUnique({
      where: { channelId: channelId },
    });
    if (post) {
      return this.createChannelInfoDto(post);
    }
    return undefined;
  }

  private createChannelInfoDto(post: any): ChannelInfoDto {
    return {
      channelId: post.channelId.toString(),
      owner: post.owner,
      admin: post.admin,
      users: post.users,
      createdAt: post.createdAt.toISOString(),
      channelType: post.channelType,
      isPassword: post.hashedPassword ? true : false,
    };
  }

}
