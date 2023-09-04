import { Module } from '@nestjs/common';
import { GamesGateway } from './games.gateway';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [GamesGateway],
  controllers: [],
  imports: [PrismaModule, UsersModule],
})
export class GamesModule {}
