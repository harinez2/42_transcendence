export type FolloweeType = {
  id: number;
  email: string;
  username: string;
  staff: boolean;
  password: string;
  twoFactorAuthEnabled: boolean;
  twoFactorAuthSecret: string;
}

export type StatusType = {
  userId: number;
  socketId: string;
  status: string;
}