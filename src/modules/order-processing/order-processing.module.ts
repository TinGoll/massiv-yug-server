import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { TestEngine } from './providers/test-engine';
import { ComponentMapper } from './providers/component-mapper';
import { OrderCreator } from './providers/order-creator';
import { RoomManager } from './room-manager/room-manager';

@Module({
  imports: [RepositoryModule],
  providers: [TestEngine, ComponentMapper, OrderCreator, RoomManager],
  exports: [OrderCreator],
})
export class OrderProcessingModule {}
