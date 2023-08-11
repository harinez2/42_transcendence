import { Module } from '@nestjs/common';
import { ChatsGateway } from './chats.gateway';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [ChatsGateway, ChatsService],
  controllers: [ChatsController],
  imports: [PrismaModule]
})
export class ChatsModule {}
