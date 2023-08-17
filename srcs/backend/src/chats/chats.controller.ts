import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { ChannelInfoDto } from './dto/channel-info.dto';
import { ApiOperation, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserType } from './chats.interface';

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
    example: '1',
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
    example: '1',
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
    example: '1',
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

  @ApiOperation({ summary: '指定したチャンネルのadmin権限を付与する' })
  @ApiParam({
    name: 'channelid',
    type: 'string',
    example: '1',
  })
  @ApiBody({
    schema: {
      properties: {
        userId: {
          type: 'string',
          example: '1',
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: '指定したチャンネルIDの情報を返却',
    type: ChannelInfoDto,
  })
  @Put(':channelid/admin')
  async addAdminRights(
      @Param('channelid') channelId: string,
      @Body() addAdminRequest: { userId: string })
      : Promise<ChannelInfoDto> {
    return await this.chatsService.addChannelUsers(
        Number(channelId), Number(addAdminRequest.userId), UserType.ADMIN);
  }

  @ApiOperation({ summary: '指定したチャンネルのadmin権限をはく奪する' })
  @ApiParam({
    name: 'channelid',
    type: 'string',
    example: '1',
  })
  @ApiBody({
    schema: {
      properties: {
        userId: {
          type: 'string',
          example: '1',
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: '指定したチャンネルIDの情報を返却',
    type: ChannelInfoDto,
  })
  @Delete(':channelid/admin')
  async removeAdminRights(
      @Param('channelid') channelId: string,
      @Body() removeAdminRequest: { userId: string })
      : Promise<ChannelInfoDto> {
    return await this.chatsService.removeChannelUsers(
        Number(channelId), Number(removeAdminRequest.userId), UserType.ADMIN);
  }

  @ApiOperation({ summary: '指定したチャンネルに入室する' })
  @ApiParam({
    name: 'channelid',
    type: 'string',
    example: '1',
  })
  @ApiBody({
    schema: {
      properties: {
        userId: {
          type: 'string',
          example: '1',
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: '指定したチャンネルIDの情報を返却',
    type: ChannelInfoDto,
  })
  @Put(':channelid/join')
  async joinChannel(
      @Param('channelid') channelId: string,
      @Body() joinRequest: { userId: string })
      : Promise<ChannelInfoDto> {
    return await this.chatsService.addChannelUsers(
        Number(channelId), Number(joinRequest.userId), UserType.USER);
  }

  @ApiOperation({ summary: '指定したチャンネルから退室する' })
  @ApiParam({
    name: 'channelid',
    type: 'string',
    example: '1',
  })
  @ApiBody({
    schema: {
      properties: {
        userId: {
          type: 'string',
          example: '1',
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: '指定したチャンネルIDの情報を返却',
    type: ChannelInfoDto,
  })
  @Delete(':channelid/leave')
  async leaveChannel(
      @Param('channelid') channelId: string,
      @Body() leaveRequest: { userId: string })
      : Promise<ChannelInfoDto> {
    return await this.chatsService.removeChannelUsers(
        Number(channelId), Number(leaveRequest.userId), UserType.USER);
  }

  @ApiOperation({ summary: 'ユーザをBanする' })
  @ApiParam({
    name: 'channelid',
    type: 'string',
    example: '1',
  })
  @ApiBody({
    schema: {
      properties: {
        bannedUserId: {
          type: 'string',
          example: '1',
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: '指定したチャンネルIDの情報を返却',
    type: ChannelInfoDto,
  })
  @Put(':channelid/ban')
  async banUser(
      @Param('channelid') channelId: string,
      @Body() banRequest: { bannedUserId: string })
      : Promise<ChannelInfoDto> {
    return await this.chatsService.banUser(Number(channelId), Number(banRequest.bannedUserId));
  }

  @ApiOperation({ summary: 'ユーザのBanを解除する' })
  @ApiParam({
    name: 'channelid',
    type: 'string',
    example: '1',
  })
  @ApiBody({
    schema: {
      properties: {
        bannedUserId: {
          type: 'string',
          example: '1',
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: '指定したチャンネルIDの情報を返却',
    type: ChannelInfoDto,
  })
  @Delete(':channelid/unban')
  async unbanUser(
      @Param('channelid') channelId: string,
      @Body() unbanRequest: { bannedUserId: string })
      : Promise<ChannelInfoDto> {
    return await this.chatsService.unbanUsers(Number(channelId), Number(unbanRequest.bannedUserId));
  }

  @ApiOperation({ summary: '現在Muteしているユーザ一覧を取得する(タイムアウトは含まない)' })
  @ApiParam({
    name: 'channelid',
    type: 'string',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: '指定したチャンネルIDの情報を返却',
    type: Array<{ mutedUserId: Number; muteUntil: Date }>,
  })
  @Get(':channelid/mute')
  async getActiveMutes(@Param('channelid') channelId: string)
      : Promise<Array<{ mutedUserId: number; muteUntil: Date }>> {
    return await this.chatsService.getActiveMutes(Number(channelId));
  }

  @ApiOperation({ summary: 'ユーザをMuteする' })
  @ApiParam({
    name: 'channelid',
    type: 'string',
    example: '1',
  })
  @ApiBody({
    schema: {
      properties: {
        mutedUserId: {
          type: 'string',
          example: '1',
        },
        muteUntil: {
          type: 'Date',
          example: new Date((new Date()).getTime() + (1000 * 60 * 3)), // 3分後
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: '指定したチャンネルIDの情報を返却',
    type: ChannelInfoDto,
  })
  @Put(':channelid/mute')
  async muteUser(
      @Param('channelid') channelId: string,
      @Body() muteRequest: { mutedUserId: string, muteUntil: Date })
      : Promise<ChannelInfoDto> {
    return await this.chatsService.muteUser(
        Number(channelId), Number(muteRequest.mutedUserId), muteRequest.muteUntil);
  }

  @ApiOperation({ summary: 'ユーザのMuteを解除する' })
  @ApiParam({
    name: 'channelid',
    type: 'string',
    example: '1',
  })
  @ApiBody({
    schema: {
      properties: {
        mutedUserId: {
          type: 'string',
          example: '1',
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: '指定したチャンネルIDの情報を返却',
    type: ChannelInfoDto,
  })
  @Delete(':channelid/unmute')
  async unmuteUser(
      @Param('channelid') channelId: string,
      @Body() unmuteRequest: { mutedUserId: string })
      : Promise<ChannelInfoDto> {
    return await this.chatsService.unmuteUsers(Number(channelId), Number(unmuteRequest.mutedUserId));
  }

}
