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

@Module({
  imports: [RepositoryModule, AuthModule],
  providers: [
    TestEngine,
    ComponentMapper,
    OrderCreator,
    RoomManager,
    GraphProvider,
    ProcessingGateway,
    OrderFinder,
  ],
  exports: [OrderCreator],
  controllers: [ProcessingController],
})
export class OrderProcessingModule {}
