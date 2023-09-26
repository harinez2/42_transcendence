import { IsString, IsNotEmpty, IsAlphanumeric, Length } from 'class-validator';

export class UsernameDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 16)
  @IsAlphanumeric()
  username: string;
}
