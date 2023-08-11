import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { Totp } from 'time2fa';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async findOrCreateUser(profile: any) {
    const user = await this.userService.findUsername(profile.username);
    if (user) {
      return user;
    }

    const newUser = await this.userService.create({
      username: profile.username,
      email: profile.emails[0].value,
      profile: {
        create: { bio: '' },
      },
    });
    return newUser;
  }

  async validateUser(userId: number) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async accessToken(userId: number) {
    return this.jwtService.sign({ sub: userId });
  }

  async findUser(userId: number) {
    return await this.userService.findOne(userId);
  }

  async validateStaff(username: string, password: string) {
    const user = await this.userService.findStaff(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      return this.jwtService.sign({ sub: user.id });
    }
    throw new UnauthorizedException();
  }

  generate2FASecret(user: User) {
    if (user.twoFactorAuthEnabled) {
      throw new HttpException('2FA already enabled', HttpStatus.BAD_REQUEST);
    }

    const { secret, url } = Totp.generateKey({
      issuer: 'Transcendence',
      user: user.username,
    });

    this.userService.update(user.id, { twoFactorAuthSecret: secret });
    return url;
  }

  enable2FA(user: User, code: string) {
    const valid = Totp.validate({
      passcode: code,
      secret: user.twoFactorAuthSecret,
    });

    if (!valid) {
      throw new HttpException("2FA code doesn't match", HttpStatus.BAD_REQUEST);
    }

    this.userService.update(user.id, { twoFactorAuthEnabled: true });
  }

  validate2FACode(user: User, code: string) {
    return Totp.validate({
      passcode: code,
      secret: user.twoFactorAuthSecret,
    });
  }
}
