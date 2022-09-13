import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { GatewayServerListsListenEvents } from './events/list.server.listen.events';
import { GatewayServerListsEmitEvents } from './events/list.server.emit.even';
import { GatewayClientListsEmitEvents } from './events/list.client.emit.even';
import { GatewayClientListsListenEvents } from './events/list.client.listen.events';
import { ListEditor } from 'src/engine/core/interfaces/dtos/client-dtos/edit-list-dto';
import { InitializingClientState, InitializingClientTools } from 'src/engine/core/interfaces/dtos/server-dtos/init-state-dto';
import { ToolsService } from 'src/modules/list-editor/services/tools/tools.service';

type ClientIo = Socket<
  GatewayClientListsListenEvents,
  GatewayClientListsEmitEvents
>;
type ServerIo = Server<
  GatewayServerListsListenEvents,
  GatewayServerListsEmitEvents,
  GatewayServerListsListenEvents
>;

@WebSocketGateway({
  namespace: 'lists',
  transports: ['websocket', 'polling', 'flashsocket'],
  cors: {
    origin: '*',
  },
})
export class ListsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: ServerIo;

  private logger: Logger = new Logger('SocketGateway');

  /************************************************************* */
  constructor(private readonly toolsService: ToolsService) {}
  /************************************************************* */

  afterInit(server: ServerIo) {}

  getInitializingState(): InitializingClientState {
    const initState: InitializingClientState = {
      tools: this.toolsService.getTools(),
    };
    return initState;
  }

  handleConnection(client: ClientIo, ...args: string[]): void {
    this.logger.log(`Клиент: ${client.id} подключился`);

    client.emit('init', this.getInitializingState());
    
    client.broadcast.emit('log', {
      ts: Date.now(),
      msg: `Клиент: ${client.id} подключился.`,
    });
  }

  handleDisconnect(client: ClientIo) {
    this.logger.log(`Клиент: ${client.id} отключился`);
    client.broadcast.emit('log', {
      ts: Date.now(),
      msg: `Клиент: ${client.id} откинулся.`,
    });
  }

  /************************************************************* */
  /** Редактор списков */

  @SubscribeMessage('listEditor')
  handleListEditor(
    client: ClientIo,
    payload: ListEditor,
  ): WsResponse<InitializingClientTools> {
    this.logger.log(JSON.stringify(payload, null, 2));
    this.toolsService.getListEditorService().act(payload);

    const tools = this.toolsService.getTools();
    client.broadcast.emit('tools', tools);
    return {
      event: 'tools',
      data: tools,
    };
  }
  /** Запрос на получение всех инструментов. */
  @SubscribeMessage('tools')
  handleGetTools(): WsResponse<InitializingClientTools> {
    return {
      event: 'tools',
      data: this.toolsService.getTools(),
    };
  }
}
