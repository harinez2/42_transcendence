import { ApiProperty } from '@nestjs/swagger';

export class ChannelInfoDto {
  @ApiProperty()
  channel_id: number;

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

  @ApiProperty({ required: false })
  hashedPassword: string = '';
}
