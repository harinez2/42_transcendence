import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class DmChannelInfoDto {
  @ApiProperty()
  channelId: number;

  @ApiProperty()
  user1: User;

  @ApiProperty()
  user2: User;
}
