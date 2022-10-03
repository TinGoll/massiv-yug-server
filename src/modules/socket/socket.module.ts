import { Module } from '@nestjs/common';
import { ConstructorGateway } from './io/constructor/constructor.gateway';
import { InternalChatGateway } from './io/chat/internal-chat.gateway';
import { OrdersGateway } from './io/orders/orders.gateway';
import { ListsGateway } from './io/lists/lists.gateway';
import { ListEditorModule } from '../list-editor/list-editor.module';
import { AuthorizationGateway } from './io/authorization/authorization.gateway';
import { ProcessingModule } from '../processing/processing.module';
import { OrderModule } from '../repositories/order/order.module';


@Module({
  imports: [ListEditorModule, ProcessingModule, OrderModule],
  providers: [
    ConstructorGateway,
    InternalChatGateway,
    OrdersGateway,
    ListsGateway,
    AuthorizationGateway,
  ],
  exports: [OrdersGateway],
})
export class SocketModule {}
