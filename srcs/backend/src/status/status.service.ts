import { Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Socket } from 'socket.io';

export enum OnlineStatus {
  OFFLINE = 'offline',
  ONLINE = 'online',
  GAMING = 'gaming',
}

@Injectable()
@ApiTags('status')
export class StatusService {
  private statusList: {
    userId: number;
    socket: Socket;
    status: OnlineStatus;
  }[] = [];

  addToOnline(client: Socket, userId: number) {
    this.statusList.push({
      userId: userId,
      socket: client,
      status: OnlineStatus.ONLINE,
    });
    console.log('[addToOnline]');
    this.printStatusList();
  }

  switchToGaming(userId: number) {
    const client = this.statusList.find((c) => c.userId === userId);
    if (client) {
      client.status = OnlineStatus.GAMING;
    }
    console.log('[switchToGaming]');
    this.printStatusList();
  }

  switchToOnline(userId: number) {
    const client = this.statusList.find((c) => c.userId === userId);
    if (client) {
      client.status = OnlineStatus.ONLINE;
    }
    console.log('[switchToOnline]');
    this.printStatusList();
  }

  switchToOffline(client: Socket) {
    this.statusList = this.statusList.filter((c) => c.socket.id !== client.id);
    console.log('[switchToOffline]');
    this.printStatusList();
  }

  getStatus(userId: number) {
    const client = this.statusList.find((c) => c.userId === userId);
    if (client)
      return client.status;
    else
      return OnlineStatus.OFFLINE;
  }

  getStatusList() {
    return this.statusList.map((c) => {
      return {
        userId: c.userId,
        socketId: c.socket.id,
        status: c.status
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
