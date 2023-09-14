import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { GameAllType, GameInfoType } from './games.interface';
import { GameSettings } from '@prisma/client';
import { InternalServerErrorException } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GamesMatchingGateway {
  constructor(private prisma: PrismaService) {}

  private waitList: { userId: number; socket: Socket }[] = [];
  private gameList: GameAllType = {};

  // 待ち行列に並ぶ
  @SubscribeMessage('game-addwaitlist')
  async handleAddWaitList(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    this.waitList.push({ userId: data.userId, socket: socket });
    console.log(
      `added to waitList: userId=${data.userId}, socket id=${socket.id}`,
    );
    if (this.waitList.length >= 2) {
      console.log('Matched!');
      const user1 = this.waitList.shift();
      const user2 = this.waitList.shift();
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
    this.waitList = this.waitList.filter((item) => item.userId !== data.userId);
    console.log(
      `leaved from waitList: userId=${data.userId}, socket id=${socket.id}`,
    );
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
}
