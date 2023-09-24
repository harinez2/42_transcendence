import { Module } from '@nestjs/common';
import { DmsGateway } from './dms.gateway';
import { DmsService } from './dms.service';
import { DmsController } from './dms.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [DmsGateway, DmsService],
  controllers: [DmsController],
  imports: [PrismaModule],
  exports: [DmsService],
})
export class DmsModule {}
