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
    // @ApiProperty()
    owner: number;

    // @ApiProperty()
    admin: number[];

    // @ApiProperty()
    user: number[];
  }
}
