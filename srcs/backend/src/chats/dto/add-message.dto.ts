import { ApiProperty } from '@nestjs/swagger';

export class AddMessageDto {
  @ApiProperty({ example: '1' })
  channelId: number;

  @ApiProperty({ example: '1' })
  senderId: number;

  @ApiProperty({ example: 'some message' })
  content: string;
}
