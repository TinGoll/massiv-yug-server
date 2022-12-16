import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { TestEngine } from './providers/test-engine';
import { ComponentMapper } from './providers/component-mapper';
import { OrderCreator } from './providers/order-creator';
import { RoomManager } from './room-manager/room-manager';
import { GraphProvider } from './providers/graph-provider';
import { ProcessingGateway } from './gateway/processing.gateway';
import { ProcessingController } from './controllers/processing.controller';


@Module({
  imports: [RepositoryModule],
  providers: [
    TestEngine,
    ComponentMapper,
    OrderCreator,
    RoomManager,
    GraphProvider,
    ProcessingGateway,
  ],
  exports: [OrderCreator],
  controllers: [ProcessingController],
})
export class OrderProcessingModule {}
