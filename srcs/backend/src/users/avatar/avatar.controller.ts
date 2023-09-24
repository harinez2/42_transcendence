import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AvatarService } from './avatar.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users/avatar')
@Controller('users/avatar')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('avatar', {
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  )
  async uploadMyAvatar(@Req() req, @UploadedFile() file: Express.Multer.File) {
    await this.avatarService.updateAvatar(req.user.id, file);
    return { message: 'Avatar uploaded successfully' };
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async deleteMyAvatar(@Req() req) {
    await this.avatarService.deleteAvatar(req.user.id);
    return { message: 'Avatar deleted successfully' };
  }

  @Get(':userId')
  async getAvatarByUserid(
    @Param('userId', ParseIntPipe) userId: number,
    @Res() res: Response,
  ) {
    const avatar = await this.avatarService.getAvatar(userId);

    res.setHeader('Content-Type', 'image/jpeg');
    res.end(avatar);
  }
}
