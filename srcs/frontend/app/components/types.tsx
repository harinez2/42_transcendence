export type GameSummaryType = {
  userId: number;
  totalCount: number;
  wonCount: number;
  lostCount: number;
};

export type UserType = {
  id: number;
  username: string;
  avatar: Uint8Array;
  email: string;
  staff: boolean;
  password: string;
  twoFactorAuthEnabled: boolean;
  twoFactorAuthSecret: string;
};

export type MatchType = {
  gameId: number;
  user1Id: number;
  user2Id: number;
  user1Score: number;
  user2Score: number;
  startedAt: string;
  endedAt: string;
};
