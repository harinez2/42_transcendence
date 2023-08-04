import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [PostsModule, UsersModule, ChatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
