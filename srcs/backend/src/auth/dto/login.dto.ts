import { IsString, IsNotEmpty } from 'class-validator';

export class StaffLoginDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  password: string;
}
