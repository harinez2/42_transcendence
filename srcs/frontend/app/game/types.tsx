
export type GameInfoType = {
  gameId: number;
  user1: {
    id: number;
    email: string;
    username: string;
    staff: boolean;
  };
  user2: {
    id: number;
    email: string;
    username: string;
    staff: boolean;
  };
  gameSettings: {
    id: number;
    gameId: number;
    points: number;
    isSpeedUp: boolean;
  };
  user1Score: number;
  user2Score: number;
  startedAt: Date;
  endedAt: Date;
};
