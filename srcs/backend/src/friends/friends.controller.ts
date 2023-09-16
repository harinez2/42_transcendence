import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('friends')
@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getFriends(@Req() req) {
    return this.friendsService.getFriends(req.user.id);
  }
}
