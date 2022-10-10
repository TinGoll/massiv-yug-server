import { Module } from '@nestjs/common';
import { ConstructorGateway } from './io/constructor/constructor.gateway';
import { OrdersGateway } from './io/orders/orders.gateway';
import { ListsGateway } from './io/lists/lists.gateway';

import { AuthorizationGateway } from './io/authorization/authorization.gateway';
import { ProcessingModule } from '../processing/processing.module';
import { RepositoryModule } from '../repository/repository.module';
import { HttpModule } from '@nestjs/axios';
import { HttpConsumingServiceService } from './http-consuming-service/http-consuming-service.service';



@Module({
  imports: [ProcessingModule, RepositoryModule, HttpModule],
  providers: [
    ConstructorGateway,
    OrdersGateway,
    ListsGateway,
    AuthorizationGateway,
    HttpConsumingServiceService,
  ],
  exports: [OrdersGateway],
})
export class SocketModule {}
