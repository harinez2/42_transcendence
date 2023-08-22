export class UpdateUserDto {
  email?: string;
  username?: string;
  twoFactorAuthEnabled?: boolean;
  twoFactorAuthSecret?: string;
}
