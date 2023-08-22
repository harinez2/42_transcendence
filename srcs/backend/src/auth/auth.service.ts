import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { Totp } from 'time2fa';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async findOrCreateUser(profile: any) {
    const user = await this.usersService.findUsername(profile.username);
    if (user) {
      return user;
    }

    const newUser = await this.usersService.create({
      username: profile.username,
      email: profile.emails[0].value,
      profile: {
        create: { bio: '' },
      },
    });
    return newUser;
  }

  async validateUser(userId: number) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async accessToken(userId: number) {
    return this.jwtService.sign({ sub: userId });
  }

  async findUser(userId: number) {
    return await this.usersService.findOne(userId);
  }

  async validateStaff(username: string, password: string) {
    const user = await this.usersService.findStaff(username);
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

    this.usersService.update(user.id, { twoFactorAuthSecret: secret });
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

    this.usersService.update(user.id, { twoFactorAuthEnabled: true });
  }

  validate2FACode(user: User, code: string) {
    return Totp.validate({
      passcode: code,
      secret: user.twoFactorAuthSecret,
    });
  }
}
