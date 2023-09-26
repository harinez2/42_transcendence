import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';
import { AuthService } from './auth.service';
import {
  FORTY_TWO_CLIENT_ID,
  FORTY_TWO_CLIENT_SECRET,
  FORTY_TWO_CALLBACK_URL,
} from 'config';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: FORTY_TWO_CLIENT_ID, // App ID
      clientSecret: FORTY_TWO_CLIENT_SECRET, // App Secret
      callbackURL: FORTY_TWO_CALLBACK_URL, // callback URL
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: any) {
    return await this.authService.login42(profile);
  }
}
