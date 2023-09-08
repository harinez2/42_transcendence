import { Module } from '@nestjs/common';
import { BlockController } from './block.controller';
import { BlockService } from './block.service';
import { PrismaModule } from '../../prisma/prisma.module'; // Import the PrismaModule

@Module({
  imports: [PrismaModule],
  controllers: [BlockController],
  providers: [BlockService],
})
export class BlockModule {}
