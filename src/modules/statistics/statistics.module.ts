import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticEntity } from './entities/statistic.entity';
import { StatisticService } from './statistic.service';

@Module({
  imports: [TypeOrmModule.forFeature([StatisticEntity])],
  providers: [StatisticService],
  exports: [StatisticService],
})
export class StatisticsModule {}
