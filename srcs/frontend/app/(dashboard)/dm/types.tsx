import { UserType } from "@/app/types";

export type DmChannelType = {
  channelId: number;
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
};

export type DmMessageType = {
  messageId: number;
  channelId: number;
  sender: UserType;
  senderId: number;
  content: string;
  createdAt: Date;
};
