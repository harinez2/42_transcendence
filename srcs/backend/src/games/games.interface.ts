import { GameSettings, User } from '@prisma/client';
import { Socket } from 'socket.io';

// キャンバス
export const CANVAS_HEIGHT = 400;
export const CANVAS_WIDTH = 600;
// パドル
export const PADDLE_HEIGHT = CANVAS_HEIGHT / 4.5;
const PADDLE_WIDTH = PADDLE_HEIGHT / 9.5;
export const L_PADDLE_X = PADDLE_WIDTH * 2.5; // 左パドルの左端
export const L_PADDLE_RIGHTX = L_PADDLE_X + PADDLE_WIDTH; // 左パドルの右端
export const R_PADDLE_X = CANVAS_WIDTH - PADDLE_WIDTH * 2.5 - PADDLE_WIDTH; // 右パドルの左端
export const START_PADDLE_Y = CANVAS_HEIGHT / 2.0 - PADDLE_HEIGHT / 2.0;
// ボール
export const BALL_SIZE = PADDLE_WIDTH * 1.5;
export const BALL_DXDY = 8;
export const SPEEDUP_AMOUNT = 8;
// インターバル
export const TIMER_INTERVAL = 120;
// ボールの位置
export const BALL_INTIAL_POSX = CANVAS_WIDTH / 2 - BALL_SIZE / 2;
export const BALL_INTIAL_POSY = CANVAS_HEIGHT / 2 - BALL_SIZE / 2;

export type GameAllType = {
  [gameId: number]: {
    info: GameInfoType;
    socket: GameSocketsType;
    play: GamePlayType;
  };
};

export type GameInfoType = {
  gameId: number;
  user1: User;
  user1Id: number;
  user2: User;
  user2Id: number;
  gameSettings: GameSettings;
  user1Score: number;
  user2Score: number;
  startedAt: Date;
  endedAt: Date;
};

export type GameSocketsType = {
  user1Socket: Socket;
  user2Socket: Socket;
};

export type GamePlayType = {
  // ボールの位置
  ballPos: PositionType;
  // ボールの移動量
  ballDxDy: PositionType;
  // パドルの位置
  lPaddlePos: PositionType;
  rPaddlePos: PositionType;
  // パドルの移動量
  paddleDxDy: PositionType;
  // ゲーム情報
  interval: NodeJS.Timer | undefined;
  // スコア
  user1Score: number;
  user2Score: number;
};

export type PositionType = {
  x: number;
  y: number;
};
