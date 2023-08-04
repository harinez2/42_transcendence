import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { ChannelInfoDto } from './dto/channel-info.dto';
import { ApiOperation, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('chats')
@ApiTags('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @ApiOperation({ summary: 'チャンネルを作成する' })
  @ApiBody({ type: CreateChannelDto })
  @ApiResponse({
    status: 201,
    description: '作成したチャンネル情報を返却',
    type: ChannelInfoDto,
  })
  @Post()
  createChannel(@Body() createChannelDto: CreateChannelDto): Promise<ChannelInfoDto> {
    return this.chatsService.createChannel(createChannelDto);
  }

  @ApiOperation({ summary: 'チャンネル一覧を取得する' })
  @ApiResponse({
    status: 200,
    description: 'チャンネル一覧を返却',
    type: [ChannelInfoDto],
  })
  @Get()
  findAllChannel() {
    return this.chatsService.findAllChannel();
  }

  @ApiOperation({ summary: '指定したチャンネルIDの情報を取得する' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: '指定したチャンネルIDの情報を返却',
    type: ChannelInfoDto,
  })
  @Get(':id')
  async findById(@Param('id') id: number): Promise<ChannelInfoDto> {
    return await this.chatsService.findById(id);
  }

}
