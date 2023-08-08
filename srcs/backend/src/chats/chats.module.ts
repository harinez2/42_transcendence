import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [ChatsService],
  controllers: [ChatsController],
  imports: [PrismaModule]
})
export class ChatsModule {}
