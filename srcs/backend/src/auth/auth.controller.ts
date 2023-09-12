import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
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

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  async handle42Callback(@Req() req, @Res() res) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.twoFactorAuthEnabled) {
      res.redirect(`${FRONT_URL}/auth/2fa?userId=${user.id}`);
      return;
    }

    const jwt = await this.authService.accessToken(user.id);
    res.cookie('jwt', jwt, { httpOnly: true });
    res.redirect(`${FRONT_URL}/test`);
  }

  @Get('validate')
  @ApiOperation({ summary: 'Check JWT validation' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  validateJwt(@Req() req) {
    return { valid: true, user: req.user };
  }

  @Post('staff')
  @ApiOperation({ summary: 'Login for staff' })
  @ApiResponse({ status: 302, description: 'Login successful.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBody({ type: StaffLoginDto })
  @HttpCode(302)
  async loginStaff(@Body() loginDto: StaffLoginDto, @Res() res) {
    const jwt = await this.authService.validateStaff(
      loginDto.username,
      loginDto.password,
    );
    res.cookie('jwt', jwt, { httpOnly: true });
    res.redirect(`${FRONT_URL}/test`);
  }

  @Post('staff/curl')
  @ApiOperation({ summary: 'Get JWT token with staff account' })
  @ApiResponse({ status: 201, description: 'Login successful.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBody({ type: StaffLoginDto })
  loginStaffCurl(@Body() loginDto: StaffLoginDto) {
    return this.authService.validateStaff(loginDto.username, loginDto.password);
  }

  @Post('2fa')
  @ApiOperation({ summary: 'Validate 2FA login' })
  @ApiResponse({ status: 302, description: 'Login successful.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 401, description: 'Invalid 2FA code.' })
  @ApiBody({ type: Login2faDto })
  @HttpCode(302)
  async login2FA(@Req() req, @Body() login2fa: Login2faDto, @Res() res) {
    const { userId, code } = login2fa;
    const user = await this.authService.findUser(+userId);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    const isValid = this.authService.validate2FACode(user, code);
    if (!isValid) {
      res.status(401).send('Invalid 2FA code');
      return;
    }

    const jwt = await this.authService.accessToken(user.id);
    res.cookie('jwt', jwt, { httpOnly: true });
    res.redirect(`${FRONT_URL}/test`);
  }

  @Get('request2faurl')
  @ApiOperation({ summary: 'Validate 2FA login' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async request2faUrl(@Req() req, @Res() res) {
    const user = req.user;

    const otpauth_url = this.authService.generate2FASecret(user);

    res.json({ otpauth_url });
  }

  @Post('enable2fa')
  @ApiOperation({ summary: 'Enable 2FA' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async enable2fa(@Req() req, @Body() enable2fa: Enable2faDto, @Res() res) {
    const user = req.user;
    const { code } = enable2fa;

    this.authService.enable2FA(user, code);

    return res.sendStatus(200);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Refresh JWT' })
  @ApiBearerAuth()
  @Get('refresh')
  async refresh(@Req() req, @Res() res) {
    const user = req.user;
    const newToken = this.authService.accessToken(user.id);
    res.cookie('jwt', newToken, { httpOnly: true });
    return res.sendStatus(200);
  }
}
