import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FollowService } from './follow.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FollowDto } from './follow.dto';

@ApiTags('friends/follow')
@Controller('friends/follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Get()
  getHello(): string {
    return this.followService.getHello();
  }

  @Get('followers')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getFollowers(@Req() req) {
    return this.followService.getFollowers(req.user.id);
  }

  @Get('followees')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getFollowees(@Req() req) {
    return this.followService.getFollowees(req.user.id);
  }

  @Get('followers/:followeeId')
  getFollowersOfOthers(@Param('followeeId', ParseIntPipe) followeeId: number) {
    return this.followService.getFollowers(followeeId);
  }

  @Get('followees/:followerId')
  getFolloweesOfOthers(@Param('followerId', ParseIntPipe) followerId: number) {
    return this.followService.getFollowees(followerId);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  follow(@Req() req, @Body() followDto: FollowDto) {
    return this.followService.setFollow(req.user.id, followDto.followeeId);
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  unfollow(@Req() req, @Body() followDto: FollowDto) {
    return this.followService.deleteFollow(req.user.id, followDto.followeeId);
  }
}
