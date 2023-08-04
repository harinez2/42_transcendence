import { ApiProperty } from '@nestjs/swagger';

export class ChannelInfoDto {
  @ApiProperty()
  channelId: number;

  @ApiProperty()
  owner: string;

  @ApiProperty()
  admin: string;

  @ApiProperty()
  users: string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  channelType: string;

  @ApiProperty()
  isPassword: boolean;
}
