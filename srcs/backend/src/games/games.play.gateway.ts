import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import {
  BALL_DXDY,
  BALL_INTIAL_POSX,
  BALL_INTIAL_POSY,
  BALL_SIZE,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  GameAllType,
  GameInfoType,
  GamePlayType,
  L_PADDLE_RIGHTX,
  L_PADDLE_X,
  PADDLE_HEIGHT,
  R_PADDLE_X,
  START_PADDLE_Y,
  TIMER_INTERVAL,
} from './games.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GamesPlayGateway {
  constructor(private prisma: PrismaService) {}

  private gameList: GameAllType = {};

  // ゲームに参加
  @SubscribeMessage('game-join')
  async handleJoinGame(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    console.log(`game-join event happened: gameId=${data.gameId}`);
    const gameId = Number(data.gameId);
    let isFetchedFromDb = false;

    // ゲームIDの情報を保持していなければDBより取得
    if (!this.gameList[gameId]) {
      this.gameList[gameId] = {
        info: await this.getGameInfo(gameId),
        socket: {
          user1Socket: undefined,
          user2Socket: undefined,
        },
        play: this.getInitialGamePlayType(),
      };
      isFetchedFromDb = true;
    }

    // ログインユーザがゲームに含まれていなければエラー
    if (
      data.userId !== this.gameList[gameId].info.user1Id &&
      data.userId !== this.gameList[gameId].info.user2Id
    ) {
      console.error(`The user is not part of this game: userId=${data.userId}`);
      socket.emit(
        'exception',
        `The user is not part of this game: userId=${data.userId}`,
      );
      if (isFetchedFromDb) delete this.gameList[gameId];
      return;
    }

    // ソケット情報を保存
    if (data.userId === this.gameList[gameId].info.user1Id) {
      this.gameList[gameId].socket.user1Socket = socket;
    } else {
      this.gameList[gameId].socket.user2Socket = socket;
    }

    // プレイユーザが2人そろっていなければ離脱
    if (
      !this.gameList[gameId].socket.user1Socket ||
      !this.gameList[gameId].socket.user2Socket
    ) {
      console.log('Waiting for the opponent...');
      socket.emit('info', 'Waiting for the opponent...');
      return;
    }

    // ゲームのタイマーを開始
    this.storeGameStartTime(gameId);
    this.gameList[gameId].socket.user1Socket.emit('game-start', gameId);
    this.gameList[gameId].socket.user2Socket.emit('game-start', gameId);
    this.gameList[gameId].play.interval = setInterval(async () => {
      await this.emitUpdateGame(gameId);
    }, TIMER_INTERVAL);
  }

  // パドルの位置更新
  @SubscribeMessage('game-post_paddle_y')
  async handleUpdatePaddleY(@MessageBody() data: any) {
    if (data.user === 1) {
      this.gameList[data.gameId].play.lPaddlePos.y = data.paddleY;
    } else if (data.user === 2) {
      this.gameList[data.gameId].play.rPaddlePos.y = data.paddleY;
    }
  }

  // ゲームから離脱
  @SubscribeMessage('game-leave')
  async handleLeaveGame(@MessageBody() data: any) {
    console.log('game-leave event happened.');
    this.finishGame(data.gameId);
  }

  //-------------------------------------------------------------------------

  private async storeGameStartTime(
    gameId: number
  ) {
    try {
      const query = await this.prisma.gameInfo.update({
        where: { gameId: gameId },
        data: {
          startedAt: new Date(),
        },
      });
      if (!query) {
        throw new InternalServerErrorException(
          'Failed to add startedAt record in the DB.',
        );
      }
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  private emitUpdateGame = async (gameId: number) => {
    await new Promise(() => {
      // すでにゲームが終わっていれば抜ける
      if (!this.gameList[gameId]) return ;

      // ゲームデータ送付
      const sendData = {
        ballPos: {
          x: this.gameList[gameId].play.ballPos.x,
          y: this.gameList[gameId].play.ballPos.y,
        },
        lPaddleY: this.gameList[gameId].play.lPaddlePos.y,
        rPaddleY: this.gameList[gameId].play.rPaddlePos.y,
      };
      this.gameList[gameId].socket.user1Socket.emit(
        'game-update_canvas',
        sendData,
      );
      this.gameList[gameId].socket.user2Socket.emit(
        'game-update_canvas',
        sendData,
      );

      // 左右の壁判定
      const newBallX =
        this.gameList[gameId].play.ballPos.x +
        this.gameList[gameId].play.ballDxDy.x;
      const newBallY =
        this.gameList[gameId].play.ballPos.y +
        this.gameList[gameId].play.ballDxDy.y;
      if (newBallX < 0) {
        // 左
        this.addAndEmitScore(gameId, 0, 1);
        this.resetBallPos(gameId);
      } else if (CANVAS_WIDTH <= newBallX + BALL_SIZE) {
        // 右
        this.addAndEmitScore(gameId, 1, 0);
        this.resetBallPos(gameId);
      }
      // ゲーム終了判定
      if (this.isGameFinished(gameId)) {
        this.finishGame(gameId);
        return;
      }
      // パドルの跳ね返り判定
      if (
        (newBallX <= L_PADDLE_RIGHTX &&
          L_PADDLE_RIGHTX - BALL_SIZE < newBallX &&
          this.gameList[gameId].play.lPaddlePos.y <= newBallY &&
          newBallY <=
            this.gameList[gameId].play.lPaddlePos.y + PADDLE_HEIGHT) || // 左
        (R_PADDLE_X <= newBallX + BALL_SIZE &&
          newBallX + BALL_SIZE < R_PADDLE_X + BALL_SIZE &&
          this.gameList[gameId].play.rPaddlePos.y <= newBallY &&
          newBallY <= this.gameList[gameId].play.rPaddlePos.y + PADDLE_HEIGHT) // 右
      ) {
        this.gameList[gameId].play.ballDxDy.x *= -1;
      }
      this.gameList[gameId].play.ballPos.x +=
        this.gameList[gameId].play.ballDxDy.x;
      // 上下の跳ね返り判定
      if (newBallY < 0 || CANVAS_HEIGHT <= newBallY + BALL_SIZE) {
        this.gameList[gameId].play.ballDxDy.y *= -1;
      }
      this.gameList[gameId].play.ballPos.y +=
        this.gameList[gameId].play.ballDxDy.y;
    });
  };

  private addAndEmitScore = (
    gameId: number,
    user1ScoreAdd: number,
    user2ScoreAdd: number,
  ) => {
    // スコア加算
    this.gameList[gameId].play.user1Score += user1ScoreAdd;
    this.gameList[gameId].play.user2Score += user2ScoreAdd;

    // クライアントにemit
    const sendData = {
      user1Score: this.gameList[gameId].play.user1Score,
      user2Score: this.gameList[gameId].play.user2Score,
      isGameFinished: this.isGameFinished(gameId),
    };
    console.log('gameId: ', gameId, ', sendData:  ', sendData);
    this.gameList[gameId].socket.user1Socket.emit(
      'game-update_score',
      sendData,
    );
    this.gameList[gameId].socket.user2Socket.emit(
      'game-update_score',
      sendData,
    );
  };

  private isGameFinished = (gameId: number): boolean => {
    const pointsToFinish = this.gameList[gameId].info.gameSettings?.points;
    if (
      this.gameList[gameId].play.user1Score >= pointsToFinish ||
      this.gameList[gameId].play.user2Score >= pointsToFinish
    ) {
      return true;
    } else {
      return false;
    }
  };

  private finishGame = async (gameId: number) => {
    // ゲームのタイマーを止める
    clearInterval(this.gameList[gameId].play.interval);

    // スコアをDBに書き込み
    try {
      const gameInfo = await this.prisma.gameInfo.update({
        where: {
          gameId: gameId,
        },
        data: {
          user1Score: this.gameList[gameId].play.user1Score,
          user2Score: this.gameList[gameId].play.user2Score,
          endedAt: new Date(),
        },
      });
      if (!gameInfo) {
        throw new InternalServerErrorException(
          `Failed to store game score: gameid=${gameId}.`,
        );
      }

      // 変数から削除
      delete this.gameList[gameId];
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  };

  private resetBallPos = (gameId: number) => {
    this.gameList[gameId].play.ballPos.x = BALL_INTIAL_POSX;
    this.gameList[gameId].play.ballPos.y = BALL_INTIAL_POSY;
  };

  private getGameInfo = async (gameId: number): Promise<GameInfoType> => {
    try {
      const gameInfo: GameInfoType = await this.prisma.gameInfo.findUnique({
        where: {
          gameId: gameId,
        },
        include: {
          user1: true,
          user2: true,
          gameSettings: true,
        },
      });
      if (!gameInfo) {
        throw new NotFoundException(`No game information with ID ${gameId}.`);
      }
      return gameInfo;
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  };

  private getInitialGamePlayType = (): GamePlayType => {
    return {
      // ボールの位置
      ballPos: { x: BALL_INTIAL_POSX, y: BALL_INTIAL_POSY },
      // ボールの移動量
      ballDxDy: { x: BALL_DXDY, y: BALL_DXDY },
      // パドルの位置
      lPaddlePos: { x: L_PADDLE_X, y: START_PADDLE_Y },
      rPaddlePos: { x: R_PADDLE_X, y: START_PADDLE_Y },
      // パドルの移動量
      paddleDxDy: { x: 0, y: 10 },
      // ゲーム情報
      interval: undefined,
      // スコア
      user1Score: 0,
      user2Score: 0,
    };
  };
}
