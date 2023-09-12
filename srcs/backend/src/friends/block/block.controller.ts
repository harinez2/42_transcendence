import { Controller, Get } from '@nestjs/common';
import { BlockService } from './block.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('friends/block')
@Controller('friends/block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Get()
  getHello(): string {
    return this.blockService.getHello();
  }
}
