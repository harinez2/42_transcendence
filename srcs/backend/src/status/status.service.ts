import { Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Socket } from 'socket.io';
import { UserType } from 'src/chats/chats.interface';
import { PrismaService } from 'src/prisma/prisma.service';

export enum OnlineStatus {
  OFFLINE = 'offline',
  ONLINE = 'online',
  GAMING = 'gaming',
}

@Injectable()
@ApiTags('status')
export class StatusService {
  constructor(private readonly prisma: PrismaService) {}

  private statusList: {
    userId: number;
    socket: Socket;
    status: OnlineStatus;
  }[] = [];

  // offline->onlineのとき
  addToOnline(socket: Socket, userId: number) {
    this.statusList.push({
      userId: userId,
      socket: socket,
      status: OnlineStatus.ONLINE,
    });
    console.log('[addToOnline]');
    this.printStatusList();
  }

  switchToGaming(socket: Socket) {
    const client = this.statusList.find((c) => c.socket.id === socket.id);
    if (client) {
      client.status = OnlineStatus.GAMING;
    }
    console.log('[switchToGaming]');
    this.printStatusList();
  }

  // gaming->onlineのとき
  switchToOnline(socket: Socket) {
    const client = this.statusList.find((c) => c.socket.id === socket.id);
    if (client) {
      client.status = OnlineStatus.ONLINE;
    }
    console.log('[switchToOnline]');
    this.printStatusList();
  }

  switchToOffline(socket: Socket) {
    this.statusList = this.statusList.filter((c) => c.socket.id !== socket.id);
    console.log('[switchToOffline]');
    this.printStatusList();
  }

  getStatus(userId: number) {
    let status: OnlineStatus = OnlineStatus.OFFLINE;
    const clients = this.statusList.filter((c) => c.userId === userId);
    for (const c of clients) {
      status = c.status;
      if (status === OnlineStatus.GAMING) break;
    }
    return status;
  }

  getStatusList() {
    return this.statusList.map((c) => {
      return {
        userId: c.userId,
        user: this.getUserInfo(c.userId),
        socketId: c.socket.id,
        status: c.status,
      };
    });
  }

  async getChatChannelUserStatus(channelId: number) {
    const users = await this.getChannelUserList(channelId);

    const userStatusPromises = users.map(async (c) => {
      const user = await this.getUserInfo(c.userId);

      let socketId = '';
      let status = OnlineStatus.OFFLINE;
      const statusData = this.statusList.find((s) => c.userId === s.userId);
      if (statusData) {
        socketId = statusData.socket.id;
        status = statusData.status;
      }

      return {
        userId: c.userId,
        user: user,
        socketId: socketId,
        status: status,
      };
    });

    return await Promise.all(userStatusPromises);
  }

  //---------------------------------------------------------------------------

  private printStatusList() {
    this.statusList.forEach((s) => {
      console.log(
        `  userId: ${s.userId}, ` +
          `socket.id: ${s.socket.id}, status: ${s.status}`,
      );
    });
  }

  private async getChannelUserList(channelId: number) {
    try {
      const channelUsers = await this.prisma.chatChannelUsers.findMany({
        where: {
          channelId: channelId,
          type: UserType.USER,
        },
      });
      return channelUsers;
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  private async getUserInfo(userId: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      return user;
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }
}
