import { ApiProperty } from '@nestjs/swagger';
import { Publicity } from '../chats.interface';

export class UpdateChannelDto {
  @ApiProperty({ example: 'general' })
  channelName: string;

  @ApiProperty({ example: 'PUBLIC' })
  channelType: Publicity;

  @ApiProperty({ required: false })
  password: string = '';
}
