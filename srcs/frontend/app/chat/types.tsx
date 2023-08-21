
export type ChannelType = {
  channelId: number;
  channelName: string;
  createdAt: Date;
  channelType: string;
  isPassword: boolean;
  users: {
    owner: number,
    admin: number[],
    user: number[],
  };
  bannedUsers: number[],
  mutedUsers: number[],
};

export type MessageType = {
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