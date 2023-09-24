import { Controller, Get, Param } from '@nestjs/common';
import { StatusService } from './status.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('status')
@ApiTags('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @ApiOperation({ summary: 'オンライン/ゲーム中のユーザ一覧を取得する' })
  @ApiResponse({
    status: 200,
    description: 'オンラインのユーザ一覧を返却',
    type: [Number],
  })
  @Get()
  getAllStatus(): any {
    return this.statusService.getStatusList();
  }
  @Get(':userId')
  findById(@Param('userId') userId: number): any {
    return this.statusService.findById(userId);
  }
}
