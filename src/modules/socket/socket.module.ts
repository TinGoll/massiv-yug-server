import { Module } from '@nestjs/common';
import { ConstructorGateway } from './io/constructor/constructor.gateway';
import { OrdersGateway } from './io/orders/orders.gateway';
import { ListsGateway } from './io/lists/lists.gateway';
import { ListEditorModule } from '../list-editor/list-editor.module';
import { AuthorizationGateway } from './io/authorization/authorization.gateway';
import { ProcessingModule } from '../processing/processing.module';



@Module({
  imports: [ListEditorModule, ProcessingModule],
  providers: [
    ConstructorGateway,
    OrdersGateway,
    ListsGateway,
    AuthorizationGateway,
  ],
  exports: [OrdersGateway],
})
export class SocketModule {}
