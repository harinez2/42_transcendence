import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.profile.findMany();
  }

  async findOne(id: number) {
    const profile = await this.prisma.profile.findUnique({
      where: { id },
    });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  async findOneByUserid(userId: number) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId: userId },
    });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  async update(id: number, updateData) {
    const profile = await this.prisma.profile.update({
      where: { id },
      data: updateData,
    });
    if (!profile) throw new NotFoundException();
    return profile;
  }

  async remove(id: number) {
    const profile = await this.prisma.profile.delete({
      where: { id },
    });
    if (!profile) throw new NotFoundException();
    return profile;
  }

  // async findOneByUsername(username: string) {
  //   return this.prisma.profile.findFirst({
  //     where: { username: username },
  //   });
  // }
}
