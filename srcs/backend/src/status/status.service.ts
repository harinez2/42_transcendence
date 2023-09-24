import { Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Socket } from 'socket.io';

export enum OnlineStatus {
  OFFLINE = 'offline',
  ONLINE = 'online',
  GAMING = 'gaming',
}

export type StatusType = {
  userId: number;
  socketId: string;
  status: string;
};

@Injectable()
@ApiTags('status')
export class StatusService {
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
        socketId: c.socket.id,
        status: c.status,
      };
    });
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
}
