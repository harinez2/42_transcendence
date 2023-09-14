import { ApiProperty } from '@nestjs/swagger';

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
