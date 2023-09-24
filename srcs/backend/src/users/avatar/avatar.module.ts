import { Module } from '@nestjs/common';
import { AvatarController } from './avatar.controller';
import { AvatarService } from './avatar.service';
import { PrismaModule } from '../../prisma/prisma.module'; // Import the PrismaModule

@Module({
  imports: [PrismaModule],
  controllers: [AvatarController],
  providers: [AvatarService],
})
export class AvatarModule {}
