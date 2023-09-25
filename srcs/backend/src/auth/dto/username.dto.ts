import { IsString, IsNotEmpty } from 'class-validator';

export class UsernameDto {
  @IsNotEmpty()
  @IsString()
  username: string;
}
