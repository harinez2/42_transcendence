import { IsNotEmpty, IsNumberString, Length } from 'class-validator';

export class Login2faDto {
  @IsNotEmpty()
  token: string;

  @IsNumberString({ no_symbols: true })
  @Length(6, 6)
  code: string;
}

export class Enable2faDto {
  @IsNumberString({ no_symbols: true })
  @Length(6, 6)
  code: string;
}
