import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { JWT_SECRET } from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        JwtStrategy.fromCookie,
      ]),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return await this.authService.loginJwt(payload);
  }

  private static fromCookie(request: Request) {
    return request?.cookies?.jwt;
  }
}
