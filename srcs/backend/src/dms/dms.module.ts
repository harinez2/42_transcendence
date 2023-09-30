import { Module, forwardRef } from '@nestjs/common';
import { DmsGateway } from './dms.gateway';
import { DmsService } from './dms.service';
import { DmsController } from './dms.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { BlockModule } from 'src/friends/block/block.module';

@Module({
  providers: [DmsGateway, DmsService],
  controllers: [DmsController],
  imports: [PrismaModule, forwardRef(() => BlockModule)],
  exports: [DmsService],
})
export class DmsModule {}
