import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService, Login42data } from './auth.service';
import { StaffLoginDto } from './dto/login.dto';
import { Login2faDto, Enable2faDto } from './dto/2fa.dto';
import { FRONT_URL } from 'config';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsernameDto } from './dto/username.dto';
import { Response } from 'express';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('validate')
  @ApiOperation({ summary: 'Check JWT validation' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  validateJwt(@Req() req) {
    return { valid: true, user: req.user };
  }

  // =========================================================================
  // SECTION 1: Login
  // =========================================================================

  @Get('42')
  @ApiOperation({ summary: '42 login' })
  @UseGuards(AuthGuard('42'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  redirectTo42() {}

  @Get('42/callback')
  @ApiOperation({ summary: 'Callback of 42 login' })
  @ApiResponse({ status: 302, description: 'Login successful.' })
  @HttpCode(302)
  @UseGuards(AuthGuard('42'))
  async handle42Callback(
    @Req() req: { user: Login42data },
    @Res() res: Response,
  ) {
    const { newuser, user, auth } = req.user;

    if (auth.twoFactorAuthEnabled) {
      const query = await this.authService.challenge2FA(user);
      res.redirect(`${FRONT_URL}/auth/2fa?${query}`);
      return;
    }

    const jwt = this.authService.accessToken(user);
    res.cookie('jwt', jwt, { httpOnly: true });

    if (newuser) {
      // TODO: WIP: redirect to displayname setting page
      res.redirect(`${FRONT_URL}/profile/me/settings/newuser`);
    } else {
      res.redirect(`${FRONT_URL}/chat`);
    }
    return;
  }

  @Post('staff')
  @ApiOperation({ summary: 'Login for staff' })
  @ApiResponse({ status: 302, description: 'Login successful.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBody({ type: StaffLoginDto })
  @HttpCode(302)
  async loginStaff(@Body() loginDto: StaffLoginDto, @Res() res: Response) {
    const jwt = await this.authService.validateStaff(
      loginDto.username,
      loginDto.password,
    );
    res.cookie('jwt', jwt, { httpOnly: true });
    res.redirect(`${FRONT_URL}/chat`);
  }

  @Post('staff/curl')
  @ApiOperation({ summary: 'Get JWT token with staff account' })
  @ApiResponse({ status: 201, description: 'Login successful.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBody({ type: StaffLoginDto })
  loginStaffCurl(@Body() loginDto: StaffLoginDto) {
    return this.authService.validateStaff(loginDto.username, loginDto.password);
  }

  // =========================================================================
  // SECTION 2: 2FA Login
  // =========================================================================

  @Post('2fa')
  @ApiOperation({ summary: 'Validate 2FA login' })
  @ApiResponse({ status: 302, description: 'Login successful.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 401, description: 'Invalid 2FA code.' })
  @ApiBody({ type: Login2faDto })
  @HttpCode(302)
  async login2FA(@Body() login2fa: Login2faDto, @Res() res: Response) {
    const { token, code } = login2fa;
    const jwt = await this.authService.response2FA(token, code);
    res.cookie('jwt', jwt, { httpOnly: true });
    res.redirect(`${FRONT_URL}/chat`);
  }

  // =========================================================================
  // SECTION 3: 2FA Setting
  // =========================================================================

  @Get('request2faurl')
  @ApiOperation({ summary: 'Validate 2FA login' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async request2faUrl(@Req() req, @Res() res: Response) {
    const otpauth_url = await this.authService.generate2FASecret(req.user);

    return res.json({ otpauth_url });
  }

  @Post('enable2fa')
  @ApiOperation({ summary: 'Enable 2FA' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async enable2fa(@Req() req, @Body() enable2fa: Enable2faDto) {
    await this.authService.enable2FA(req.user, enable2fa.code);
    return;
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Refresh JWT' })
  @ApiBearerAuth()
  @Get('refresh')
  async refresh(@Req() req, @Res() res: Response) {
    const newToken = this.authService.accessToken(req.user);
    return res.cookie('jwt', newToken, { httpOnly: true });
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('is2fa')
  async fetch2faEnabled(@Req() req) {
    return await this.authService.is2faEnabled(req.user);
  }

  // =========================================================================
  // SECTION 4: Other settings
  // =========================================================================

  @Post('logout')
  logout(@Res() res: Response) {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).send('Logged out');
  }

  @Post('username')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: UsernameDto })
  async updateUsername(@Req() req, @Body() dto: UsernameDto) {
    return await this.authService.changeUsername(req.user, dto.username);
  }
}
