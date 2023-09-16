import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ChatsModule } from './chats/chats.module';
import { DmsModule } from './dms/dms.module';
import { GamesModule } from './games/games.module';
import { ProfilesModule } from './profiles/profiles.module';
import { FriendsModule } from './friends/friends.module';
import { AuthModule } from './auth/auth.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    UsersModule,
    ChatsModule,
    DmsModule,
    GamesModule,
    FriendsModule,
    ProfilesModule,
    AuthModule,
    StatusModule,
  ],
  controllers: [AppController],
  providers: [AppGateway, AppService],
})
export class AppModule {}
