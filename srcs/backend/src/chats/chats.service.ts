import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { ChannelInfoDto } from './dto/channel-info.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Publicity, UserType } from './chats.interface';
import { hash } from 'bcrypt';

@Injectable()
export class ChatsService {
  constructor(private prisma: PrismaService) {}

  // channel operations

  async createChannel(createChannelDto: CreateChannelDto): Promise<ChannelInfoDto> {
    const hashedPassword
        = createChannelDto.password
          ? await hash(createChannelDto.password, 10) as string : null;

    try {
      // ChatChannelsテーブルとChatChannelUsersテーブルを同時に更新
      const createdPost = await this.prisma.chatChannelUsers.create({
        data: {
          channel: {
            create: {
              channelName: createChannelDto.channelName,
              createdAt: new Date(),
              channelType: createChannelDto.channelType,
              hashedPassword: hashedPassword,
            }
          },
          user: {
            connect: { id: createChannelDto.ownerId },
          },
          type: UserType.OWNER,
        },
      });

      this.addChannelUsers(createdPost.channelId, createChannelDto.ownerId, UserType.ADMIN);
      this.addChannelUsers(createdPost.channelId, createChannelDto.ownerId, UserType.USER);
      return this.findById(createdPost.channelId);
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  async findAllChannel(): Promise<ChannelInfoDto[]> {
    try {
      const posts = await this.prisma.chatChannels.findMany();
      const channelInfoPromises = posts.map((post) => this.createChannelInfoDto(post));
      return await Promise.all(channelInfoPromises);
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  async findById(channelId: number): Promise<ChannelInfoDto> {
    try {
      const post = await this.prisma.chatChannels.findUnique({
        where: { channelId: channelId },
      });
      if (!post) {
        throw new NotFoundException();
      }
      return this.createChannelInfoDto(post);
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  async updateChannel(channelId: number, updateChannelDto: UpdateChannelDto)
      : Promise<ChannelInfoDto> {
    const hashedPassword
    = updateChannelDto.password
      ? await hash(updateChannelDto.password, 10) as string : null;

    try {
      const post = await this.prisma.chatChannels.update({
        where: { channelId: channelId },
        data: {
          channelName: updateChannelDto.channelName,
          channelType: updateChannelDto.channelType,
          hashedPassword: hashedPassword,
        },
      });
      if (!post) {
        throw new NotFoundException();
      }
      return this.createChannelInfoDto(post);
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  async deleteChannel(channelId: number) : Promise<void> {
    try {
      const post = await this.prisma.chatChannels.delete({
        where: { channelId: channelId },
      });
      if (!post) {
        throw new NotFoundException();
      }
      await this.prisma.chatChannelUsers.deleteMany({
        where: { channelId: channelId },
      });
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  // add/remove users

  async addChannelUsers(
      channelId: number, userId : number, type: UserType): Promise<ChannelInfoDto> {
    try {
      const ischannel = await this.isChannelUsers(channelId, userId, type);
      if (!ischannel) {
        const query = await this.prisma.chatChannelUsers.create({
          data: {
            channelId: channelId,
            userId: userId,
            type: type,
          },
        });
        if (!query) {
          throw new BadRequestException();
        }
      }
      return this.findById(channelId);
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  async removeChannelUsers(
      channelId: number, userId: number, type: UserType): Promise<ChannelInfoDto> {
    try {
      const query = await this.prisma.chatChannelUsers.deleteMany({
        where: {
          channelId: channelId,
          userId: userId,
          type: type,
        },
      });
      if (!query) {
        throw new NotFoundException();
      }
      return this.findById(channelId);
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  // ban operations

  async banUser(channelId: number, bannedUserId : number): Promise<ChannelInfoDto> {
  try {
    const query = await this.prisma.chatBan.create({
      data: {
        channelId: channelId,
        bannedUserId: bannedUserId,
      },
    });
    if (!query) {
      throw new BadRequestException();
    }
    return this.findById(channelId);
  } catch (e) {
    throw this.prisma.handleError(e);
  }
}

async unbanUsers(channelId: number, bannedUserId: number): Promise<ChannelInfoDto> {
  try {
    const query = await this.prisma.chatBan.deleteMany({
      where: {
        channelId: channelId,
        bannedUserId: bannedUserId,
      },
    });
    if (!query) {
      throw new NotFoundException();
    }
    return this.findById(channelId);
  } catch (e) {
    throw this.prisma.handleError(e);
  }
}

  // mute operations

  async getActiveMutes(channelId: number)
      : Promise<Array<{ mutedUserId: number; muteUntil: Date }>> {
    try {
      const activeMutes = await this.prisma.chatMute.findMany({
        where: {
          channelId: channelId,
          muteUntil: {
            // 現在時刻より後のものだけを抽出
            gt: new Date(),
          },
        },
      });

      return activeMutes.map(mute => ({
        mutedUserId: mute.mutedUserId,
        muteUntil: mute.muteUntil,
      }));
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  async muteUser(channelId: number, mutedUserId : number, muteUntil: Date)
      : Promise<ChannelInfoDto> {
    try {
      const existingMute = await this.prisma.chatMute.findFirst({
        where: {
          channelId: channelId,
          mutedUserId: mutedUserId,
        },
      });

      if (existingMute) {
        // すでに登録がある場合、muteUntilのみ書き換える
        const updatedMute = await this.prisma.chatMute.update({
          where: {
            id: existingMute.id,
          },
          data: {
            muteUntil: muteUntil,
          },
        });
        if (!updatedMute) {
          throw new BadRequestException();
        }
      } else {
        // 登録がない場合は新規追加
        const createdMute = await this.prisma.chatMute.create({
          data: {
            channelId: channelId,
            mutedUserId: mutedUserId,
            muteUntil: muteUntil,
          },
        });
        if (!createdMute) {
          throw new BadRequestException();
        }
      }

      return this.findById(channelId);
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  async unmuteUsers(channelId: number, mutedUserId: number): Promise<ChannelInfoDto> {
    try {
      const query = await this.prisma.chatMute.deleteMany({
        where: {
          channelId: channelId,
          mutedUserId: mutedUserId,
        },
      });
      if (!query) {
        throw new NotFoundException();
      }
      return this.findById(channelId);
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  //------------------------------------------------------------------------------
  // private functions

  private async isChannelUsers(
      channelId: number, userId : number, type: UserType): Promise<boolean> {
    const query = await this.prisma.chatChannelUsers.findFirst({
      where: {
        channelId: channelId,
        userId: userId,
        type: type,
      },
    });
    if (query)
      return true;
    else
      return false;
  }

  private async createChannelInfoDto(post: any): Promise<ChannelInfoDto> {
    const owner = await this.prisma.chatChannelUsers.findFirst({
      where: {
        channelId: post.channelId,
        type: UserType.OWNER,
      },
    });
    const admins = await this.prisma.chatChannelUsers.findMany({
      where: {
        channelId: post.channelId,
        type: UserType.ADMIN,
      },
    });
    const users = await this.prisma.chatChannelUsers.findMany({
      where: {
        channelId: post.channelId,
        type: UserType.USER,
      },
    });
    const bans = await this.prisma.chatBan.findMany({
      where: {
        channelId: post.channelId,
      },
    });
    const mutes = await this.prisma.chatMute.findMany({
      where: {
        channelId: post.channelId,
      },
    });
    return {
      channelId: post.channelId.toString(),
      channelName: post.channelName,
      createdAt: post.createdAt.toISOString(),
      channelType: post.channelType,
      isPassword: post.hashedPassword ? true : false,
      users: {
        owner: owner.userId,
        admin: admins.map(admin => admin.userId),
        user: users.map(user => user.userId),
      },
      bannedUsers: bans.map(user => user.bannedUserId),
      mutedUsers: mutes.map(user => ({
        mutedUserId: user.mutedUserId,
        muteUntil: user.muteUntil,
      })),
    };
  }

}
