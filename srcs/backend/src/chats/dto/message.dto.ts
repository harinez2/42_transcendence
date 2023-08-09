import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
  @ApiProperty({ example: '1' })
  channelId: number;

  @ApiProperty({ example: 'login' })
  senderId: number;

  @ApiProperty({ example: 'some message' })
  content: string;
}
