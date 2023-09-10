import { Injectable, NotFoundException } from '@nestjs/common';
import { GameInfoDto } from './dto/game-info.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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
      const post = await this.prisma.gameInfo.findUnique({
        where: { gameId: gameId },
        include: {
          user1: true,
          user2: true,
          gameSettings: true,
        },
      });
      if (!post) {
        throw new NotFoundException();
      }
      return post;
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }

  async findByUserId(userId: number): Promise<GameInfoDto[]> {
    try {
      const channel = await this.prisma.gameInfo.findMany({
        where: {
          OR: [{ user1Id: userId }, { user2Id: userId }],
        },
        include: {
          user1: true,
          user2: true,
          gameSettings: true,
        },
      });
      if (!channel) {
        throw new NotFoundException();
      }
      return channel;
    } catch (e) {
      throw this.prisma.handleError(e);
    }
  }
}
