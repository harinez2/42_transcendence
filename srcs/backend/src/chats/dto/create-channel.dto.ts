import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto {
  @ApiProperty({ example: 'general' })
  channelName: string;

  @ApiProperty({ example: 'owner' })
  owner: string;

  @ApiProperty({ example: 'public' })
  channelType: string;

  @ApiProperty({ required: false })
  password: string = '';
}
