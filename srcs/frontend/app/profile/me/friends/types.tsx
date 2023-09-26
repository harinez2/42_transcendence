export type FolloweeType = {
  id: number;
  username: string;
  avatar: Uint8Array;
  email: string;
  staff: boolean;
  password: string;
  twoFactorAuthEnabled: boolean;
  twoFactorAuthSecret: string;
};

export type StatusType = {
  userId: number;
  socketId: string;
  status: string;
};

export type ProfileType = {
  id: number;
  bio: string;
  userId: number;
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
