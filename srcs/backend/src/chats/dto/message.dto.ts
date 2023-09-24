import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class MessageDto {
  @ApiProperty({ example: 1 })
  messageId: number;

  @ApiProperty({ example: '1' })
  channelId: number;

  @ApiProperty()
  sender: User;

  @ApiProperty({ example: '1' })
  senderId: number;

  @ApiProperty({ example: 'some message' })
  content: string;

  @ApiProperty()
  createdAt: Date;
}
