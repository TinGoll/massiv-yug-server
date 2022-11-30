import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ItmService } from './services/itm.service';

@Module({
  imports: [HttpModule],
  providers: [ItmService],
  exports: [ItmService],
})
export class RequestModule {}
