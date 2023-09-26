import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { ChannelInfoDto } from './dto/channel-info.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserType } from './chats.interface';
// import { Publicity, UserType } from './chats.interface';
import { compare, hash } from 'bcrypt';
import { Publicity } from '@prisma/client';

@Injectable()
export class ChatsService {
  constructor(private prisma: PrismaService) {}

  // channel operations

  async createChannel(
    createChannelDto: CreateChannelDto,
  ): Promise<ChannelInfoDto> {
    const hashedPassword = createChannelDto.password
      ? ((await hash(createChannelDto.password, 10)) as string)
      : null;

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
            },
          },
          user: {
            connect: { id: createChannelDto.ownerId },
          },
          type: UserType.OWNER,
        },
      });

      await this.addChannelUsers(
        createdPost.channelId,
        createChannelDto.ownerId,
        UserType.USER,
        createChannelDto.password,
      );
      await this.addChannelUsers(
        createdPost.channelId,
        createChannelDto.ownerId,
        UserType.ADMIN,
      );
      return this.findById(createdPost.channelId);
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  async findAllChannelByUserId(userId: number): Promise<ChannelInfoDto[]> {
    try {
      const posts = await this.prisma.chatChannels.findMany({
        where: {
          users: {
            some: {
              userId: userId,
            },
          },
        },
      });
      const channelInfoPromises = posts.map(
        async (post) => await this.createChannelInfoDto(post),
      );
      return await Promise.all(channelInfoPromises);
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  async findAllPublicChannel(): Promise<ChannelInfoDto[]> {
    try {
      const posts = await this.prisma.chatChannels.findMany({
        where: { channelType: Publicity.PUBLIC },
      });
      const channelInfoPromises = posts.map(
        async (post) => await this.createChannelInfoDto(post),
      );
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
      return await this.createChannelInfoDto(post);
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  async findByChannelName(channelName: string): Promise<ChannelInfoDto> {
    try {
      const post = await this.prisma.chatChannels.findUnique({
        where: { channelName: channelName },
      });
      if (!post) {
        throw new NotFoundException();
      }
      return await this.createChannelInfoDto(post);
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  async updateChannel(
    channelId: number,
    updateChannelDto: UpdateChannelDto,
  ): Promise<ChannelInfoDto> {
    const hashedPassword = updateChannelDto.password
      ? ((await hash(updateChannelDto.password, 10)) as string)
      : null;

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
      return await this.createChannelInfoDto(post);
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  async deleteChannel(channelId: number): Promise<void> {
    try {
      // ユーザ権限、メッセージ、Ban、Muteの各テーブルを削除
      const deleteChatChannelUsers = this.prisma.chatChannelUsers.deleteMany({
        where: { channelId: channelId },
      });
      const deleteChatMessages = this.prisma.chatMessages.deleteMany({
        where: { channelId: channelId },
      });
      const deleteChatBan = this.prisma.chatBan.deleteMany({
        where: { channelId: channelId },
      });
      const deleteChatMute = this.prisma.chatMute.deleteMany({
        where: { channelId: channelId },
      });

      // チャンネル削除
      const deleteChatChannels = this.prisma.chatChannels.delete({
        where: { channelId: channelId },
      });

      // 上記の各処理を1つのトランザクションにまとめる
      const transaction = await this.prisma.$transaction([
        deleteChatChannelUsers,
        deleteChatMessages,
        deleteChatBan,
        deleteChatMute,
        deleteChatChannels,
      ]);
      if (!transaction) {
        throw new NotFoundException();
      }
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  // add/remove users

  async addChannelUsers(
    channelId: number,
    userId: number,
    type: UserType,
    password?: string,
  ): Promise<ChannelInfoDto> {
    try {
      // Banされているユーザでないかをチェック
      const ban = await this.prisma.chatBan.findUnique({
        where: {
          channelId_bannedUserId: {
            channelId: channelId,
            bannedUserId: userId,
          },
        },
      });
      if (ban) {
        throw new ForbiddenException('The specified user is banned.');
      }

      // Admin付与時、Userであること
      if (
        type === UserType.ADMIN &&
        !(await this.isChannelUsers(channelId, userId, UserType.USER))
      ) {
        throw new ForbiddenException(
          'The user you are trying to grant Admin privileges to is not in this Channel.',
        );
      }

      // すでに登録されているかチェック
      const ischannel = await this.isChannelUsers(channelId, userId, type);
      if (ischannel) {
        if (type === UserType.ADMIN) {
          throw new BadRequestException(
            'The specified user is already in the admins.',
          );
        } else if (type === UserType.USER) {
          throw new BadRequestException(
            'The specified user is already in the channel.',
          );
        }
      }

      // パスワード付きのチャンネルの場合、パスワードが正しいかチェック
      const channel = await this.findById(channelId);
      if (
        type === UserType.USER &&
        channel.channelType === Publicity.PRIVATE &&
        channel.isPassword
      ) {
        if (
          !(password && (await this.isPasswordCorrect(channelId, password)))
        ) {
          throw new ForbiddenException('The password is incorrect.');
        }
      }

      // 作成
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
      return this.findById(channelId);
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  async removeChannelUsers(
    channelId: number,
    userId: number,
    type: UserType,
  ): Promise<ChannelInfoDto> {
    try {
      const isChannelOwner = await this.isChannelUsers(
        channelId,
        userId,
        UserType.OWNER,
      );
      // Ownerは退室できないのでチェック
      if (type === UserType.USER && isChannelOwner) {
        throw new ForbiddenException('The owner cannot leave the channel.');
      }
      // OwnerはAdminから外れられないのでチェック
      if (type === UserType.ADMIN && isChannelOwner) {
        throw new ForbiddenException(
          'The owner cannot be removed from the admins.',
        );
      }

      // ユーザを削除
      const query = await this.prisma.chatChannelUsers.deleteMany({
        where: {
          channelId: channelId,
          userId: userId,
          ...(type === UserType.ADMIN ? { type: UserType.ADMIN } : {}),
        },
      });
      if (query.count === 0) {
        if (type === UserType.ADMIN)
          throw new NotFoundException(
            'The specified user is not in the admins.',
          );
        else
          throw new NotFoundException(
            'The specified user is not in the channel.',
          );
      }
      return this.findById(channelId);
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  // ban operations

  async getBans(channelId: number): Promise<{ bannedUsers: number[] }> {
    try {
      const bans = await this.prisma.chatBan.findMany({
        where: {
          channelId: channelId,
        },
      });

      return {
        bannedUsers: bans.map((ban) => ban.bannedUserId),
      };
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  async banUser(
    channelId: number,
    bannedUserId: number,
  ): Promise<ChannelInfoDto> {
    try {
      // OwnerはBanできないのでチェック
      if (await this.isChannelUsers(channelId, bannedUserId, UserType.OWNER)) {
        throw new ForbiddenException('The owner cannot be banned.');
      }

      // すでにBanにいれば400エラー
      const bans = await this.getBans(channelId);
      if (bans.bannedUsers.includes(bannedUserId)) {
        throw new BadRequestException('The specified user is already banned.');
      }

      // Banに追加
      const query = await this.prisma.chatBan.create({
        data: {
          channelId: channelId,
          bannedUserId: bannedUserId,
        },
      });
      if (!query) {
        throw new BadRequestException();
      }

      // チャンネルから追い出し
      await this.removeChannelUsers(channelId, bannedUserId, UserType.USER);

      return this.findById(channelId);
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  async unbanUsers(
    channelId: number,
    bannedUserId: number,
  ): Promise<ChannelInfoDto> {
    try {
      const query = await this.prisma.chatBan.deleteMany({
        where: {
          channelId: channelId,
          bannedUserId: bannedUserId,
        },
      });
      if (query.count === 0) {
        throw new NotFoundException();
      }
      return this.findById(channelId);
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  // mute operations

  async getActiveMutes(
    channelId: number,
  ): Promise<Array<{ mutedUserId: number; muteUntil: Date }>> {
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

      return activeMutes.map((mute) => ({
        mutedUserId: mute.mutedUserId,
        muteUntil: mute.muteUntil,
      }));
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  async muteUser(
    channelId: number,
    mutedUserId: number,
    muteUntil: Date,
  ): Promise<ChannelInfoDto> {
    try {
      // OwnerはMuteできないのでチェック
      if (await this.isChannelUsers(channelId, mutedUserId, UserType.OWNER)) {
        throw new ForbiddenException('The owner cannot be muted.');
      }

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

  async unmuteUsers(
    channelId: number,
    mutedUserId: number,
  ): Promise<ChannelInfoDto> {
    try {
      const query = await this.prisma.chatMute.deleteMany({
        where: {
          channelId: channelId,
          mutedUserId: mutedUserId,
        },
      });
      if (query.count === 0) {
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
    channelId: number,
    userId: number,
    type: UserType,
  ): Promise<boolean> {
    console.log(channelId, userId, type);
    const query = await this.prisma.chatChannelUsers.findFirst({
      where: {
        channelId: channelId,
        userId: userId,
        type: type,
      },
    });
    if (query) return true;
    else return false;
  }

  private async isPasswordCorrect(
    channelId: number,
    password: string,
  ): Promise<boolean> {
    const query = await this.prisma.chatChannels.findFirst({
      where: {
        channelId: channelId,
      },
    });
    // compare hashed password
    if (!query.hashedPassword) {
      throw new BadRequestException();
    }

    return compare(password, query.hashedPassword);
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
      channelId: post.channelId,
      channelName: post.channelName,
      createdAt: post.createdAt?.toISOString(),
      channelType: post.channelType,
      isPassword: post.hashedPassword ? true : false,
      users: {
        owner: owner.userId,
        admin: admins.map((admin) => admin.userId),
        user: users.map((user) => user.userId),
      },
      bannedUsers: bans.map((user) => user.bannedUserId),
      mutedUsers: mutes.map((user) => ({
        mutedUserId: user.mutedUserId,
        muteUntil: user.muteUntil,
      })),
    };
  }
}
