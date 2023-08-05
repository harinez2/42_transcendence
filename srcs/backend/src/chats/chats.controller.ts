import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
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
    type: 'string',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: '指定したチャンネルIDの情報を返却',
    type: ChannelInfoDto,
  })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<ChannelInfoDto> {
    return await this.chatsService.findById(Number(id));
  }

  @ApiOperation({ summary: '指定したチャンネルIDの情報を更新する' })
  @ApiParam({
    name: 'id',
    type: 'string',
    example: 1,
  })
  @ApiBody({ type: UpdateChannelDto })
  @ApiResponse({
    status: 200,
    description: '指定したチャンネルIDの情報を返却',
    type: ChannelInfoDto,
  })
  @Put(':id')
  async updateChannel(@Param('id') id: string, @Body() updateChannelDto: UpdateChannelDto)
      : Promise<ChannelInfoDto> {
    return await this.chatsService.updateChannel(Number(id), updateChannelDto);
  }

  @ApiOperation({ summary: '指定したチャンネルIDの情報を削除する' })
  @ApiParam({
    name: 'id',
    type: 'string',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: '戻り値なし',
    type: null,
  })
  @Delete(':id')
  async deleteChannel(@Param('id') id: string) : Promise<void> {
    return await this.chatsService.deleteChannel(Number(id));
  }

}
