import { Module, forwardRef } from '@nestjs/common';
import { BlockController } from './block.controller';
import { BlockService } from './block.service';
import { PrismaModule } from '../../prisma/prisma.module'; // Import the PrismaModule
import { BlockGateway } from './block.gateway';
import { DmsModule } from 'src/dms/dms.module';

@Module({
  imports: [PrismaModule, forwardRef(() => DmsModule)],
  exports: [BlockService],
  controllers: [BlockController],
  providers: [BlockService, BlockGateway],
})
export class BlockModule {}
