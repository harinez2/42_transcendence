import { Socket } from 'socket.io';

export type GameInfoType = {
  gameId: number;
  user1Id: number;
  user1Socket: Socket;
  user2Id: number;
  user2Socket: Socket;
};

export type GameSettingsType = {
  gameId: number;
  points: number;
  isSpeedUp: boolean;
};
