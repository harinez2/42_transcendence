import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  ConnectedSocket,
  WsException,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { PositionType } from './games.interface';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { UsersService } from '../users/users.service';

// キャンバス
const canvasHeight = 400;
const canvasWidth = 600;
// パドル
const paddleHeight = canvasHeight / 4.5;
const paddleWidth = paddleHeight / 9.5;
const lPaddleX = paddleWidth * 2.5; // 右パドルの左端
const lPaddleRightX = lPaddleX + paddleWidth; // 左パドルの右端
const rPaddleX = canvasWidth - paddleWidth * 2.5 - paddleWidth; // 右パドルの左端
// ボール
const ballSize = paddleWidth * 1.5;
// インターバル
const timerInterval = 120;
// ボールの位置
const ballIntialPosX = canvasWidth / 2 - ballSize / 2;
const ballIntialPosY = canvasHeight / 2 - ballSize / 2;

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GamesPlayGateway {
  constructor() {}

  // ボールの位置
  private ballPos: PositionType = { x: ballIntialPosX, y: ballIntialPosY };
  // ボールの移動量
  private ballDxDy: PositionType = { x: 8, y: 8 };
  // パドルの位置
  private lPaddlePos: PositionType = { x: lPaddleX, y: 0 };
  private rPaddlePos: PositionType = { x: rPaddleX, y: 0 };
  // パドルの移動量
  private paddleDxDy: PositionType = { x: 0, y: 10 };
  private interval = undefined;

  // ゲームに参加
  @SubscribeMessage('game-join')
  async handleJoinGame(@ConnectedSocket() socket: Socket) {
    console.log('game-join event happened.');
    this.interval = setInterval(async () => {
      await this.emit_update_game(socket);
    }, timerInterval);
  }

  // パドルの位置更新
  @SubscribeMessage('post_paddle_y')
  async handleUpdatePaddleY(@MessageBody() data: any) {
    this.lPaddlePos.y = data.paddleY;
  }

  // ゲームから離脱
  @SubscribeMessage('game-leave')
  async handleLeaveGame(@ConnectedSocket() socket: Socket) {
    console.log('game-leave event happened.');
    clearInterval(this.interval);
  }

  //-------------------------------------------------------------------------

  private emit_update_game = async (socket) => {
    await new Promise(() => {
      socket?.emit('update_canvas', {
        ballPos: { x: this.ballPos.x, y: this.ballPos.y },
        lPaddleY: this.lPaddlePos.y,
        rPaddleY: this.rPaddlePos.y,
      });
      const newBallX = this.ballPos.x + this.ballDxDy.x;
      const newBallY = this.ballPos.y + this.ballDxDy.y;
      // 左右の壁判定
      if (
        newBallX < 0 || // 左
        canvasWidth <= newBallX + ballSize // 右
      ) {
        this.ballPos.x = ballIntialPosX;
        this.ballPos.y = ballIntialPosY;
      }
      // パドルの跳ね返り判定
      if (
        (newBallX < lPaddleRightX &&
          this.lPaddlePos.y <= newBallY &&
          newBallY <= this.lPaddlePos.y + paddleHeight) || // 左
        (newBallX + ballSize >= rPaddleX &&
          this.rPaddlePos.y <= newBallY &&
          newBallY <= this.rPaddlePos.y + paddleHeight) // 右
      ) {
        this.ballDxDy.x *= -1;
      }
      this.ballPos.x += this.ballDxDy.x;
      // 上下の跳ね返り判定
      if (newBallY < 0 || canvasHeight <= newBallY + ballSize) {
        this.ballDxDy.y *= -1;
      }
      this.ballPos.y += this.ballDxDy.y;

      // 自動パドル、削除予定
      if (
        this.rPaddlePos.y + this.paddleDxDy.y < 0 ||
        canvasHeight <= this.rPaddlePos.y + this.paddleDxDy.y + paddleHeight
      ) {
        this.paddleDxDy.y *= -1;
      }
      this.rPaddlePos.y += this.paddleDxDy.y;
    });
  };
}
