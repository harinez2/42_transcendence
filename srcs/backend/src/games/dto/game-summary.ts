import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class GameSummaryDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  totalCount: number;

  @ApiProperty()
  wonCount: number;

  @ApiProperty()
  lostCount: number;

}
