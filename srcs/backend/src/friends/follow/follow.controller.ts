import { Controller, Get } from '@nestjs/common';
import { FollowService } from './follow.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('friends/follow')
@Controller('friends/follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Get()
  getHello(): string {
    return this.followService.getHello();
  }
}
