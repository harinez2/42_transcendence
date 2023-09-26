import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    if (!user) throw new NotFoundException();
    return user;
  }

  async findUsername(username: string) {
    return await this.prisma.user.findFirst({
      where: { username: username },
    });
  }
}
