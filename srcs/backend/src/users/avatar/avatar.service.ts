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
      const avatar = await this.prisma.avatar.findUnique({
        where: { userId: userId },
        select: { data: true },
      });
      const data = avatar?.data || null;
      if (!data) {
        return await this.getDefaultAvatar();
      }
      return data;
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
      const updated = await this.prisma.avatar.upsert({
        create: {
          userId: userId,
          data: jpegBuffer,
        },
        update: {
          data: jpegBuffer,
        },
        where: {
          userId: userId,
        },
      });
      await this.prisma.user.update({
        where: { id: userId },
        data: { updated: updated.updated },
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException();
    }
  }

  async deleteAvatar(userId: number) {
    try {
      const updated = await this.prisma.avatar.delete({
        where: { id: userId },
      });
      await this.prisma.user.update({
        where: { id: userId },
        data: { updated: updated.updated },
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
