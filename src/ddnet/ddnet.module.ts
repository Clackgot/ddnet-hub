import { Module } from '@nestjs/common';
import { DdnetService } from './ddnet.service';
import { DdnetController } from './ddnet.controller';

@Module({
  providers: [DdnetService],
  controllers: [DdnetController]
})
export class DdnetModule {}
