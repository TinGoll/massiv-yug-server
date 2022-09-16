import { Module } from '@nestjs/common';
import { ConstructorGateway } from './io/constructor/constructor.gateway';
import { InternalChatGateway } from './io/chat/internal-chat.gateway';
import { OrdersGateway } from './io/orders/orders.gateway';
import { ListsGateway } from './io/lists/lists.gateway';
import { ListEditorModule } from '../list-editor/list-editor.module';
import { AuthorizationGateway } from './io/authorization/authorization.gateway';

@Module({
  imports: [ListEditorModule],
  providers: [
    ConstructorGateway,
    InternalChatGateway,
    OrdersGateway,
    ListsGateway,
    AuthorizationGateway,
  ],
})
export class SocketModule {}
