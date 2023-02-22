import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { TestEngine } from './providers/test-engine';
import { ComponentMapper } from './providers/component-mapper';
import { OrderCreator } from './providers/order-creator';
import { RoomManager } from './room-manager/room-manager';
import { GraphProvider } from './providers/graph-provider';
import { ProcessingGateway } from './gateway/processing.gateway';
import { ProcessingController } from './controllers/processing.controller';
import { AuthModule } from '../auth/auth.module';
import { OrderFinder } from './providers/order-finder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryEntity } from './entities/history.entity';
import { HistoryService } from './services/history.service';
import { NomenclatureProvider } from './providers/nomenclature-provider';
import { StatisticsModule } from '../statistics/statistics.module';

@Module({
  imports: [
    RepositoryModule,
    AuthModule,
    TypeOrmModule.forFeature([HistoryEntity]),
    StatisticsModule,
  ],
  providers: [
    TestEngine,
    ComponentMapper,
    OrderCreator,
    RoomManager,
    GraphProvider,
    ProcessingGateway,
    OrderFinder,
    HistoryService,
    NomenclatureProvider,
  ],
  exports: [OrderCreator, HistoryService],
  controllers: [ProcessingController],
})
export class OrderProcessingModule {}
