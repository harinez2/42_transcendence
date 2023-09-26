import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { GamesService } from './games.service';
import { ApiOperation, ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { GameInfoDto } from './dto/game-info.dto';
import { GameSummaryDto } from './dto/game-summary';

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
  async findById(
    @Param('gameid', ParseIntPipe) gameId: number,
  ): Promise<GameInfoDto> {
    return await this.gamesService.findById(gameId);
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
  async findByUserId(
    @Param('userid', ParseIntPipe) userId: number,
  ): Promise<GameInfoDto[]> {
    return await this.gamesService.findByUserId(userId);
  }

  @ApiOperation({ summary: 'ユーザの勝敗数を取得する' })
  @ApiParam({
    name: 'userid',
    type: 'string',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: '指定したユーザの勝敗数を返却',
    type: [GameSummaryDto],
  })
  @Get('summary/user/:userid')
  async countWonLostNum(
    @Param('userid', ParseIntPipe) userId: number,
  ): Promise<GameSummaryDto> {
    return await this.gamesService.countWonLostNum(userId);
  }

  @Get('ranking/win/:userId')
  async getWinRanking(@Param('userId', ParseIntPipe) userId: number) {
    return await this.gamesService.getWinRanking(userId);
  }

  @Get('ranking/win')
  async getWinRankingList() {
    return await this.gamesService.getWinRankingList();
  }
}
