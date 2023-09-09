import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  ConnectedSocket,
  WsException,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { GameInfoType, GameSettingsType } from './games.interface';
import { UsersService } from '../users/users.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GamesMatchingGateway {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService,
  ) {}

  private waitList: { userId: number; socket: Socket }[] = [];
  private gameList: GameInfoType[] = [];

  // 待ち行列に並ぶ
  @SubscribeMessage('game-addwaitlist')
  async handleAddWaitList(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    this.waitList.push({ userId: data.userId, socket: socket });
    console.log(
      `added to waitList: userId: ${data.userId}, socket id: ${socket.id}`,
    );
    if (this.waitList.length >= 2) {
      console.log('Matched!');
      const user1 = this.waitList.shift();
      const user2 = this.waitList.shift();
      if (user1 && user2) {
        // ゲーム情報の保存
        const gameInfo: GameInfoType = {
          gameId: -1,
          user1Id: user1.userId,
          user1Socket: user1.socket,
          user2Id: user2.userId,
          user2Socket: user2.socket,
        };
        const storedGameInfo = await this.storeGameInfo(gameInfo);
        gameInfo.gameId = storedGameInfo.gameId;
        this.gameList.push(gameInfo);
        console.log('waiting for configuring the game: ', gameInfo.gameId);
        const gameUser = {
          gameId: gameInfo.gameId,
          user1Id: gameInfo.user1Id,
          user1Name: this.userService.findOne(gameInfo.user1Id),
          user2Id: gameInfo.user2Id,
          user2Name: this.userService.findOne(gameInfo.user2Id),
        };
        // コンフィグリクエスト
        gameInfo.user1Socket.emit('game-configrequest', gameUser);
        gameInfo.user2Socket.emit('game-configuring', gameUser);
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
      `leaved from waitList: userId: ${data.userId}, socket id: ${socket.id}`,
    );
  }

  // コンフィグ受信
  @SubscribeMessage('game-config')
  handleGetConfig(
    @ConnectedSocket() client: Socket,
    @MessageBody() gameSettings: GameSettingsType,
  ) {
    console.log('gameSettings:', gameSettings);
    // コンフィグの妥当性チェック
    if (gameSettings.points < 3 || 7 < gameSettings.points) {
      client.emit('error', 'Config error: point range is invalid.');
      return;
    }
    // ゲーム情報を検索
    const gameInfo = this.gameList.find(
      (gameInfo) => gameInfo.gameId === gameSettings.gameId,
    );
    if (!gameInfo) {
      client.emit('error', 'Game not found.');
      return;
    }
    const gameData = {
      gameId: gameInfo.gameId,
      user1Id: gameInfo.user1Id,
      user2Id: gameInfo.user2Id,
      config: gameSettings,
    };
    // ゲーム開始
    gameInfo.user1Socket.emit('game-start', gameData);
    gameInfo.user2Socket.emit('game-start', gameData);
  }

  //-------------------------------------------------------------------------

  private async storeGameInfo(gameInfo: GameInfoType): Promise<any> {
    try {
      const query: any = await this.prisma.gameInfo.create({
        data: {
          user1Id: gameInfo.user1Id,
          user2Id: gameInfo.user2Id,
          startedAt: new Date(),
        },
      });
      if (!query) {
        throw new WsException('Failed to create gameInfo record in the DB.');
      }
      return query;
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }
}
