import { Socket } from 'socket.io';

export type GameInfoType = {
  gameId: number,
  user1Id: number,
  user1Socket: Socket,
  user2Id: number,
  user2Socket: Socket,
};

export type GameSettingsType = {
  gameId: number,
  points: number;
  isSpeedUp: boolean;
};

const waitStatus = {
  NotMatched: 0,
  WaitingForSetting: 1,
  Gaming: 2,
} as const;
 
type waitStatus = (typeof waitStatus)[keyof typeof waitStatus];
// 上は type Position = 0 | 1 | 2 | 3 と同じ意味
