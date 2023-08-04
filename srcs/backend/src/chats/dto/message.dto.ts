import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
  @ApiProperty({ example: '1' })
  channelId: number;

  @ApiProperty({ example: 'login' })
  sender: string;

  @ApiProperty({ example: 'some message' })
  content: string;
}
