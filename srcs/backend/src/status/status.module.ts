import { Module } from '@nestjs/common';
import { StatusGateway } from './status.gateway';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';

@Module({
  providers: [StatusGateway, StatusService],
  controllers: [StatusController],
  exports: [StatusService],
})
export class StatusModule {}
