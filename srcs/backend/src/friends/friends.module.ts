import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BlockModule } from './block/block.module';
import { FollowModule } from './follow/follow.module';

@Module({
  imports: [PrismaModule, BlockModule, FollowModule],
  controllers: [FriendsController],
  providers: [FriendsService],
})
export class FriendsModule {}
