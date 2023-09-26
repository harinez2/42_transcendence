import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { GameAllType, GameInfoType, WaitStatus } from './games.interface';
import { GameSettings } from '@prisma/client';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { StatusService } from 'src/status/status.service';
import { DmsService } from 'src/dms/dms.service';
import { FRONT_URL } from 'config';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GamesMatchingGateway {
  constructor(
    private prisma: PrismaService,
    private readonly statusService: StatusService,
    private readonly dmsService: DmsService,
  ) {}

  private waitList: { userId: number; socket: Socket }[] = [];
  private gameList: GameAllType = {};

  // waitlistから削除する
  removeFromWaitlist(socket: Socket) {
    console.log(`removeFromWaitlist: socket.id=${socket.id}`);
    this.waitList = this.waitList.filter(
      (item) => item.socket.id !== socket.id,
    );
    this.printWaitList();
  }

  // 途中で画面を閉じて再度開いた際、前の状態を調べて返す
  @SubscribeMessage('game-getstatus')
  async handleGetStatus(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    const query = await this.getNotStartedGameInfo(data.userId);
    if (query) {
      if (query.gameSettings) {
        socket.emit('game-status', WaitStatus.Gaming, query.gameId);
        console.log(
          `[game-status] userId=${data.userId}, Resuming to ${WaitStatus.Gaming}`,
        );
      } else {
        if (!this.gameList[query.gameId]) {
          // ゲーム情報をgameListに保存
          this.gameList[query.gameId] = {
            info: query,
            socket: {
              user1Socket: undefined,
              user2Socket: undefined,
            },
            play: undefined,
          };
        }

        if (query.user1Id === data.userId) {
          this.gameList[query.gameId].socket.user1Socket = socket;
          socket.emit(
            'game-status',
            WaitStatus.WaitingForSetting,
            query.gameId,
          );
          console.log(
            `[game-status] userId=${data.userId}, Resuming to ${WaitStatus.WaitingForSetting}`,
          );
        } else {
          this.gameList[query.gameId].socket.user2Socket = socket;
          socket.emit(
            'game-status',
            WaitStatus.WaitingForOpponentSetting,
            query.gameId,
          );
          console.log(
            `[game-status] userId=${data.userId}, Resuming to ${WaitStatus.WaitingForOpponentSetting}`,
          );
        }
      }
    } else {
      if (this.waitList.some((c) => c.userId === data.userId)) {
        // waitlistから削除
        this.removeFromWaitlist(socket);
        // 改めてwaitListに登録
        this.handleAddWaitList(socket, data);

        socket.emit('game-status', WaitStatus.NotMatched);
        console.log(
          `[game-status] userId=${data.userId}, Resuming to ${WaitStatus.NotMatched}`,
        );
      } else {
        socket.emit('game-status', WaitStatus.NotStarted);
        console.log(
          `[game-status] userId=${data.userId}, Resuming to ${WaitStatus.NotStarted}`,
        );
      }
    }
    // ステータスを「ゲーム中」に変更
    this.statusService.switchToGaming(socket);
  }

  // 待ち行列に並ぶ
  @SubscribeMessage('game-addwaitlist')
  async handleAddWaitList(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    this.waitList.push({ userId: data.userId, socket: socket });
    console.log(
      `added to waitList: userId=${data.userId}, socket.id=${socket.id}`,
    );
    this.printWaitList();

    const uniqueUserIds: number[] = Array.from(
      new Set(this.waitList.map((i) => i.userId)),
    );
    console.log(`  uniqueUserIds: ${uniqueUserIds}`);
    if (uniqueUserIds.length >= 2) {
      // waitListからuserIdの違う2つを取り出し
      const user1 = this.waitList.shift();
      let user2;
      for (let i = 0; i < this.waitList.length; i++) {
        if (this.waitList[i].userId !== user1.userId) {
          user2 = this.waitList.splice(i, 1)[0];
          break;
        }
      }
      console.log('Matched!');
      console.log(`  userId: ${user1.userId}, socket.id: ${user1.socket.id}`);
      console.log(`  userId: ${user2.userId}, socket.id: ${user2.socket.id}`);

      if (user1 && user2) {
        // ゲーム情報をDBに保存
        const storedGameInfo: GameInfoType = await this.storeGameInfo(
          user1.userId,
          user2.userId,
        );

        // ゲーム情報をgameListに保存
        this.gameList[storedGameInfo.gameId] = {
          info: storedGameInfo,
          socket: {
            user1Socket: user1.socket,
            user2Socket: user2.socket,
          },
          play: undefined,
        };

        // コンフィグリクエスト
        console.log(
          'waiting for configuring the game: ',
          storedGameInfo.gameId,
        );
        this.gameList[storedGameInfo.gameId].socket.user1Socket.emit(
          'game-configrequest',
          storedGameInfo,
        );
        this.gameList[storedGameInfo.gameId].socket.user2Socket.emit(
          'game-configuring',
          storedGameInfo,
        );
      }
    }
  }

  // 待ち行列から外れる
  @SubscribeMessage('game-removefromwaitlist')
  handleLeaveWaitList(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    console.log(
      `game-removefromwaitlist: userId=${data.userId}, socket id=${socket.id}`,
    );

    // waitListから削除
    this.removeFromWaitlist(socket);

    // ステータスを「オンライン」に変更
    this.statusService.switchToOnline(socket);
  }

  // コンフィグ受信
  @SubscribeMessage('game-config')
  handleGetConfig(
    @ConnectedSocket() socket: Socket,
    @MessageBody() gameSettings: GameSettings,
  ) {
    console.log('gameSettings:', gameSettings);
    // コンフィグの妥当性チェック
    if (gameSettings.points < 3 || 7 < gameSettings.points) {
      socket.emit('error', 'Config error: point range is invalid.');
      return;
    }

    // ゲーム情報を検索
    if (!this.gameList[gameSettings.gameId]) {
      socket.emit('error', 'Game not found.');
      return;
    }

    // コンフィグ情報をDBに保存
    this.storeGameSettings(gameSettings);

    // ゲーム開始
    this.gameList[gameSettings.gameId].socket.user1Socket.emit(
      'game-ready',
      gameSettings.gameId,
    );
    this.gameList[gameSettings.gameId].socket.user2Socket.emit(
      'game-ready',
      gameSettings.gameId,
    );
    delete this.gameList[gameSettings.gameId];
  }

  // ゲームに招待
  @SubscribeMessage('game-invite')
  async inviteToGame(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ): Promise<number> {
    console.log(
      `game-invite: myUserId=${data.myUserId}, invitingUserId=${data.invitingUserId}`,
    );

    let channel;
    try {
      // DMルーム情報を(なければルーム作成したうえで)取得
      channel = await this.dmsService.findBTwoUserId(
        data.myUserId,
        data.invitingUserId,
      );
    } catch (e) {
      if (e instanceof NotFoundException) {
        this.dmsService.createChannel({
          user1Id: data.myUserId,
          user2Id: data.invitingUserId,
        });
        channel = await this.dmsService.findBTwoUserId(
          data.myUserId,
          data.invitingUserId,
        );
      }
    }

    try {
      // すでに該当ペアのゲームがないか検索
      let storedGameInfo = await this.getNotStartedGameInfoPair(
        data.myUserId,
        data.invitingUserId,
      );
      if (!storedGameInfo) {
        // ゲーム情報をDBに保存
        storedGameInfo = await this.storeGameInfo(
          data.myUserId,
          data.invitingUserId,
        );
      }

      // メッセージを投稿
      const url = FRONT_URL + `/game/preparing`;
      const content =
        `${channel.user1.username}さんがあなたをゲームに招待しています！` + url;
      const createdMessage = await this.prisma.dmMessages.create({
        data: {
          channelId: channel.channelId,
          senderId: data.myUserId,
          content: content,
          createdAt: new Date(),
        },
      });
      const addedMessage = await this.dmsService.findMessageById(
        createdMessage.messageId,
      );
      // メッセージをブロードキャスト(自分以外、すなわち相手)
      socket.to('dm_' + channel.channelId).emit('dm-message', addedMessage);
      // メッセージを自分にも送信
      socket.emit('dm-message', addedMessage);
      return storedGameInfo.gameId;
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  //-------------------------------------------------------------------------

  private async storeGameInfo(
    user1Id: number,
    user2Id: number,
  ): Promise<GameInfoType> {
    try {
      const query: GameInfoType = await this.prisma.gameInfo.create({
        data: {
          user1Id: user1Id,
          user2Id: user2Id,
        },
        include: {
          user1: true,
          user2: true,
          gameSettings: true,
        },
      });
      if (!query) {
        throw new InternalServerErrorException(
          'Failed to create gameInfo record in the DB.',
        );
      }
      return query;
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  private async getNotStartedGameInfo(userId: number): Promise<GameInfoType> {
    try {
      const query: GameInfoType = await this.prisma.gameInfo.findFirst({
        where: {
          startedAt: null,
          OR: [{ user1Id: userId }, { user2Id: userId }],
        },
        include: {
          user1: true,
          user2: true,
          gameSettings: true,
        },
      });
      return query;
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  private async getNotStartedGameInfoPair(
    user1Id: number,
    user2Id: number,
  ): Promise<GameInfoType> {
    try {
      const query: GameInfoType = await this.prisma.gameInfo.findFirst({
        where: {
          startedAt: null,
          OR: [
            { user1Id: user1Id, user2Id: user2Id },
            { user1Id: user2Id, user2Id: user1Id },
          ],
        },
        include: {
          user1: true,
          user2: true,
          gameSettings: true,
        },
      });
      return query;
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  private async storeGameSettings(
    gameSettings: GameSettings,
  ): Promise<GameSettings> {
    try {
      const query: GameSettings = await this.prisma.gameSettings.create({
        data: gameSettings,
      });
      if (!query) {
        throw new InternalServerErrorException(
          'Failed to create gameSettings record in the DB.',
        );
      }
      return query;
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  private printWaitList() {
    this.waitList.forEach((s) => {
      console.log(`  userId: ${s.userId}, socket.id: ${s.socket.id}`);
    });
  }
}
