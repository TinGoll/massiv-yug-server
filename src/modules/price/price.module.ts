import { Module } from '@nestjs/common';
import { PriceMapper } from './price.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceEntity } from './price.entity';
import { PriceService } from './price.service';

@Module({
  imports: [TypeOrmModule.forFeature([PriceEntity])],
  providers: [PriceMapper, PriceService],
})
export class PriceModule {}
