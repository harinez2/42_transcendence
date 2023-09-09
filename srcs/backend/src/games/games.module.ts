import { Module } from '@nestjs/common';
import { GamesMatchingGateway } from './games.matching.gateway';
import { GamesPlayGateway } from './games.play.gateway';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [GamesMatchingGateway, GamesPlayGateway],
  controllers: [],
  imports: [PrismaModule, UsersModule],
})
export class GamesModule {}
