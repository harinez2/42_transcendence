import { Module } from '@nestjs/common';
import { StatusGateway } from './status.gateway';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [StatusGateway, StatusService],
  controllers: [StatusController],
  imports: [PrismaModule],
  exports: [StatusService],
})
export class StatusModule {}
