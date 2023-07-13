import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.users.findMany({});
  }

  findOne(user_id: string) {
    return this.prisma.users.findUnique({ where: { user_id } });
  }
}
