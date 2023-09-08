import { Module } from '@nestjs/common';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { PrismaModule } from '../../prisma/prisma.module'; // Import the PrismaModule

@Module({
  imports: [PrismaModule],
  controllers: [FollowController],
  providers: [FollowService],
})
export class FollowModule {}
