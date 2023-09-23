import { Injectable } from '@nestjs/common';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { Totp } from 'time2fa';
import { CryptoService } from './crypto.service';
import { AUTH2FA_SECRET } from 'config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService,
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

  async challenge2FA(user: User) {
    const data = await this.jwtService.signAsync(
      { id: user.id },
      { secret: AUTH2FA_SECRET, expiresIn: 3600 },
    );

    const token = await this.cryptoService.encrypt(data);
    return `token=${token}`;
  }

  async response2FA(token: string, code: string) {
    try {
      const data = await this.cryptoService.decrypt(token);

      const { id } = await this.jwtService.verifyAsync(data, {
        secret: AUTH2FA_SECRET,
      });
      const user = await this.usersService.findOne(id);
      if (!user) {
        throw new UnauthorizedException('unknown client');
      }
      if (!user.twoFactorAuthEnabled || !user.twoFactorAuthSecret) {
        throw new UnauthorizedException('2FA not set for client');
      }

      if (!this.validate2FACode(user, code)) {
        throw new BadRequestException('Invalid 2FA code');
      }

      return await this.accessToken(user.id);
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new UnauthorizedException();
    }
  }

  generate2FASecret(user: User) {
    if (user.twoFactorAuthEnabled) {
      throw new BadRequestException('2FA already enabled');
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
      secret: user.twoFactorAuthSecret || '',
    });

    if (!valid) {
      throw new BadRequestException('Invalid 2FA code');
    }

    this.usersService.update(user.id, { twoFactorAuthEnabled: true });
  }

  validate2FACode(user: User, code: string) {
    return Totp.validate({
      passcode: code,
      secret: user.twoFactorAuthSecret || '',
    });
  }
}
