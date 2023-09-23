import { ApiProperty } from '@nestjs/swagger';
import { Publicity } from '../chats.interface';
import { Matches } from 'class-validator';

export class CreateChannelDto {
  @ApiProperty({ example: 'general' })
  @Matches(/^[a-zA-Z0-9_-]{1,16}$/, {
    message:
      'Channel name must be 1 to 16 characters long and can only contain alphanumeric characters, hyphens, and underscores.',
  })
  channelName: string;

  @ApiProperty({ example: 1 })
  ownerId: number;

  @ApiProperty({ example: 'PUBLIC' })
  channelType: Publicity;

  @ApiProperty({ required: false })
  password = '';
}
