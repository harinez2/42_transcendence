import { IsNumber } from 'class-validator';

export class FollowDto {
  @IsNumber()
  followeeId: number;
}
