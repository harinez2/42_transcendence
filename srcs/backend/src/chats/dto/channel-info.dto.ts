import { ApiProperty } from '@nestjs/swagger';
import { Publicity } from '../chats.interface';

export class ChannelInfoDto {
  @ApiProperty()
  channelId: number;

  @ApiProperty()
  channelName: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  channelType: Publicity;

  @ApiProperty()
  isPassword: boolean;

  @ApiProperty()
  users: {
    owner: number;
    admin: number[];
    user: number[];
  };

  @ApiProperty()
  bannedUsers: number[];

  @ApiProperty()
  mutedUsers: {
    mutedUserId: number;
    muteUntil: Date;
  }[];
}
