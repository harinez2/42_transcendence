export type GameUserType = {
  gameId: number;
  user1Id: number;
  user2Id: number;
};

export type GameSettingsType = {
  points: number;
  isSpeedUp: boolean;
};

export const WaitStatus = {
  Initial: 0, // 初期状態
  NotMatched: 1, // waitlist登録済み、相手探し中
  WaitingForSetting: 2, // マッチした、設定中
  Gaming: 3, // 設定完了、ゲーム開始可能
} as const;

export type WaitStatusType = (typeof WaitStatus)[keyof typeof WaitStatus];
// 上は type WaitStatusType = 0 | 1 | 2 | 3 と同じ意味

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

export interface Position {
  x: number;
  y: number;
}
