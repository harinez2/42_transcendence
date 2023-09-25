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
