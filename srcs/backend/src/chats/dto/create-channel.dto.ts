import { ApiProperty } from '@nestjs/swagger';
import { Publicity } from '../chats.interface';

export class CreateChannelDto {
  @ApiProperty({ example: 'general' })
  channelName: string;

  @ApiProperty({ example: 1 })
  ownerId: number;

  @ApiProperty({ example: 'PUBLIC' })
  channelType: Publicity;

  @ApiProperty({ required: false })
  password = '';
}
