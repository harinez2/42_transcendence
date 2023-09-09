import { Controller, Get, Param } from '@nestjs/common';
import { GamesService } from './games.service';
import { ApiOperation, ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { GameInfoDto } from './dto/game-info.dto';

@Controller('games')
@ApiTags('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @ApiOperation({ summary: 'ゲーム一覧を取得する' })
  @ApiResponse({
    status: 200,
    description: 'ゲーム一覧を返却',
    type: [GameInfoDto],
  })
  @Get()
  async findAllGame(): Promise<GameInfoDto[]> {
    return await this.gamesService.findAllGame();
  }

  @ApiOperation({ summary: '指定したゲームの情報を取得する' })
  @ApiParam({
    name: 'gameid',
    type: 'string',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: '指定したゲームIDの情報を返却',
    type: GameInfoDto,
  })
  @Get(':gameid')
  async findById(@Param('gameid') gameId: string): Promise<GameInfoDto> {
    return await this.gamesService.findById(Number(gameId));
  }

  @ApiOperation({ summary: '指定したユーザが含まれるゲームの一覧を取得する' })
  @ApiParam({
    name: 'userid',
    type: 'string',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: '指定したユーザIDの情報を返却',
    type: [GameInfoDto],
  })
  @Get('user/:userid')
  async findByUserId(@Param('userid') userId: string): Promise<GameInfoDto[]> {
    return await this.gamesService.findByUserId(Number(userId));
  }
}
