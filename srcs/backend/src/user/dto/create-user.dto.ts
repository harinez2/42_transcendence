export class CreateUserDto {
  email: string;
  username: string;
  twoFactorAuthEnabled?: boolean;
  twoFactorAuthSecret?: string;
  profile: {
    create: {
      bio: string;
    };
  };
}
