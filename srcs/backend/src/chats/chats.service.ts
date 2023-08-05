import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
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

  async updateChannel(channelId: number, updateChannelDto: UpdateChannelDto)
      : Promise<ChannelInfoDto> {
    const hashedPassword
    = updateChannelDto.password
      ? await hash(updateChannelDto.password, 10) as string : null;

    const post = await this.prisma.chatChannels.update({
      where: { channelId: channelId },
      data: {
        channelName: updateChannelDto.channelName,
        admin: updateChannelDto.admin,
        channelType: updateChannelDto.channelType,
        hashedPassword: hashedPassword,
      },
    });
    if (!post) {
      throw new NotFoundException();
    }
    return this.createChannelInfoDto(post);
  }

  async deleteChannel(channelId: number) : Promise<void> {
    const post = await this.prisma.chatChannels.delete({
      where: { channelId: channelId },
    });
    if (!post) {
      throw new NotFoundException(`Channel with ID ${channelId} not found.`);
    }
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
