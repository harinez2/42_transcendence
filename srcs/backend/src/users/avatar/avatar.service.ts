import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as sharp from 'sharp';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class AvatarService {
  constructor(private readonly prisma: PrismaService) {}

  async getAvatar(userId: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { avatar: true },
      });
      const avatar = user?.avatar || null;
      if (!avatar) {
        return await this.getDefaultAvatar();
      }
      return avatar;
    } catch {
      throw new NotFoundException();
    }
  }

  async updateAvatar(userId: number, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    if (!['image/png', 'image/jpeg'].includes(file.mimetype)) {
      throw new BadRequestException('Invalid file format');
    }

    let jpegBuffer: Buffer;
    try {
      jpegBuffer = await sharp(file.buffer)
        .resize(500)
        .jpeg({ quality: 90 })
        .toBuffer();
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Invalid image content');
    }

    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: { avatar: jpegBuffer },
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException();
    }
  }

  async deleteAvatar(userId: number) {
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: { avatar: null },
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException();
    }
  }

  private async getDefaultAvatar() {
    // FROM: dist/src/users/avatar/avatar.service.ts
    // TO  : assets/default-avatar.jpg
    const defaultAvatarPath = join(
      __dirname,
      '../../../../assets/default-avatar.jpg',
    );
    return readFileSync(defaultAvatarPath);
  }
}
