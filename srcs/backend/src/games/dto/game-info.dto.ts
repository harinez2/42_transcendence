import { ApiProperty } from '@nestjs/swagger';
import { GameSettings, User } from '@prisma/client';

export class GameInfoDto {
  @ApiProperty()
  gameId: number;

  @ApiProperty()
  user1: User;

  @ApiProperty()
  user2: User;

  @ApiProperty()
  user1Score: number;

  @ApiProperty()
  user2Score: number;

  @ApiProperty()
  startedAt: Date;

  @ApiProperty()
  endedAt: Date;

  @ApiProperty()
  gameSettings: GameSettings;
}
