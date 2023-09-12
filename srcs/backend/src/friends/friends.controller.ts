import { Controller, Get } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('friends')
@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Get()
  getHello(): string {
    return this.friendsService.getHello();
  }
}
