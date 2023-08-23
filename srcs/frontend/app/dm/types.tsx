
export type ProfileType = {
  userId: string;
  bio: string
};

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
  channelId: number;
  sender: {
    id: number;
    email: string;
    username: string;
    staff: boolean;
  };
  senderId: number;
  content: string;
  createdAt: Date;
}
