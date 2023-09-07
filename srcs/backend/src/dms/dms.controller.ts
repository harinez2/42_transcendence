import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { DmsService } from './dms.service';
import { CreateDmChannelDto } from './dto/create-dm-channel.dto';
import { DmChannelInfoDto } from './dto/dm-channel-info.dto';
import {
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';

@Controller('dms')
@ApiTags('dms')
export class DmsController {
  constructor(private readonly dmsService: DmsService) {}

  @ApiOperation({ summary: 'チャンネルを作成する' })
  @ApiBody({ type: CreateDmChannelDto })
  @ApiResponse({
    status: 201,
    description: '作成したチャンネルIDを返却',
    type: Number,
  })
  @Post()
  async createChannel(
    @Body() createChannelDto: CreateDmChannelDto,
  ): Promise<number> {
    return await this.dmsService.createChannel(createChannelDto);
  }

  @ApiOperation({
    summary: '指定したユーザIDが含まれるチャンネル情報を取得する',
  })
  @ApiParam({
    name: 'userid',
    type: 'string',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: '指定したユーザIDが含まれるチャンネル情報を返却',
    type: Array<DmChannelInfoDto>,
  })
  @Get(':userid')
  async findById(
    @Param('userid', ParseIntPipe) userid: number,
  ): Promise<DmChannelInfoDto[]> {
    return await this.dmsService.findByUserId(userid);
  }
}
