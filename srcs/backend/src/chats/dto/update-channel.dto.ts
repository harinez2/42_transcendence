import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto {
  @ApiProperty({ example: 'general' })
  channelName: string;

  @ApiProperty({ example: 'admin' })
  admin: string;

  @ApiProperty({ example: 'public' })
  channelType: string;

  @ApiProperty({ required: false })
  password: string = '';
}
