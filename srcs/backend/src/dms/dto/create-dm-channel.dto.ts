import { ApiProperty } from '@nestjs/swagger';

export class CreateDmChannelDto {
  @ApiProperty({ example: 1 })
  user1Id: number;

  @ApiProperty({ example: 2 })
  user2Id: number;
}
