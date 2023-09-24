import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { StatusService } from './status.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('status')
@ApiTags('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @ApiOperation({ summary: 'オンライン/ゲーム中のユーザ一覧を取得する' })
  @ApiResponse({
    status: 200,
    description: 'オンライン/ゲーム中のユーザ一覧を返却',
  })
  @Get()
  getAllStatus(): any {
    return this.statusService.getStatusList();
  }

  @ApiOperation({
    summary:
      '指定したチャンネルのオンライン/ゲーム中/オフラインのユーザ一覧を取得する',
  })
  @ApiParam({
    name: 'channelid',
    type: 'string',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description:
      '指定したチャンネルのオンライン/ゲーム中/オフラインのユーザ一覧を返却',
  })
  @Get('channel/:channelid')
  async getChatChannelUserStatus(
    @Param('channelid', ParseIntPipe) channelId: number,
  ): Promise<any> {
    return await this.statusService.getChatChannelUserStatus(channelId);
  }

  @Get(':userId')
  findById(@Param('userId', ParseIntPipe) userId: number) {
    return this.statusService.getStatus(userId);
  }
}
