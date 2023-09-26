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
import { BlockService } from './block.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { BlockDto } from './block.dto';

@ApiTags('friends/block')
@Controller('friends/block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Get()
  getHello(): string {
    return this.blockService.getHello();
  }

  @Get('blockers')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getBlockers(@Req() req) {
    return this.blockService.getBlockers(req.user.id);
  }

  @Get('blockeds')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getBlockeds(@Req() req) {
    return this.blockService.getBlockeds(req.user.id);
  }

  @Get('blockers/:blockedId')
  getBlockersOfOthers(@Param('blockedId', ParseIntPipe) blockedId: number) {
    return this.blockService.getBlockers(blockedId);
  }

  @Get('blockeds/:blockerId')
  getBlockedsOfOthers(@Param('blockerId', ParseIntPipe) blockerId: number) {
    return this.blockService.getBlockeds(blockerId);
  }

  @Post()
  @ApiBody({ type: BlockDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  block(@Req() req, @Body() blockDto: BlockDto) {
    console.log(req.user.id, blockDto.blockeeId);
    return this.blockService.setBlock(req.user.id, blockDto.blockeeId);
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  unblock(@Req() req, @Body() blockDto: BlockDto) {
    return this.blockService.deleteBlock(req.user.id, blockDto.blockeeId);
  }
}
