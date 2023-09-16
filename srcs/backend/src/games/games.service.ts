import { Injectable, NotFoundException } from '@nestjs/common';
import { GameInfoDto } from './dto/game-info.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GameSummaryDto } from './dto/game-summary';

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService) {}

  async findAllGame(): Promise<GameInfoDto[]> {
    try {
      const games = await this.prisma.gameInfo.findMany({
        include: {
          user1: true,
          user2: true,
          gameSettings: true,
        },
      });
      return games;
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  async findById(gameId: number): Promise<GameInfoDto> {
    try {
      const game = await this.prisma.gameInfo.findUnique({
        where: { gameId: gameId },
        include: {
          user1: true,
          user2: true,
          gameSettings: true,
        },
      });
      if (!game) {
        throw new NotFoundException();
      }
      return game;
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  async findByUserId(userId: number): Promise<GameInfoDto[]> {
    try {
      const games = await this.prisma.gameInfo.findMany({
        where: {
          OR: [{ user1Id: userId }, { user2Id: userId }],
        },
        include: {
          user1: true,
          user2: true,
          gameSettings: true,
        },
      });
      if (!games) {
        throw new NotFoundException();
      }
      return games;
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  async countWonLostNum(userId: number): Promise<GameSummaryDto> {
    try {
      const games = await this.prisma.gameInfo.findMany({
        where: {
          OR: [{ user1Id: userId }, { user2Id: userId }],
          NOT: {
            endedAt: null,
          },
        },
      });
      let wonCount = 0;
      let lostCount = 0;
      games.map((game) => {
        if (
          (game.user1Id === userId && game.user1Score > game.user2Score) ||
          (game.user2Id === userId && game.user1Score < game.user2Score)
        ) {
          wonCount++;
        } else if (
          (game.user1Id === userId && game.user1Score < game.user2Score) ||
          (game.user2Id === userId && game.user1Score > game.user2Score)
        ) {
          lostCount++;
        }
      });
      return {
        userId: userId,
        totalCount: wonCount + lostCount,
        wonCount: wonCount,
        lostCount: lostCount,
      };
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }
}
