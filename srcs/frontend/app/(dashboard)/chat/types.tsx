import { UserType } from "@/app/types";

export type ChannelType = {
  channelId: number;
  channelName: string;
  createdAt: Date;
  channelType: string;
  isPassword: boolean;
  users: {
    owner: number;
    admin: number[];
    user: number[];
  };
  bannedUsers: number[];
  mutedUsers: number[];
};

export type MessageType = {
  messageId: number;
  channelId: number;
  sender: UserType;
  senderId: number;
  content: string;
  createdAt: Date;
};

export type createChannelDTO = {
  channelName: string;
  ownerId: number;
  channelType: Publicity;
  password: string | null;
};

export enum Publicity {
  PUBLIC = "PUBLIC", // eslint-disable-line no-unused-vars
  PRIVATE = "PRIVATE", // eslint-disable-line no-unused-vars
}

export type updateChannelDTO = {
  channelName: string;
  channelType: Publicity;
  password: string | null;
};
