import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Namespace, Server, Socket } from 'socket.io';
import { Logger, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { GatewayServerListsListenEvents } from './events/list.server.listen.events';
import { GatewayServerListsEmitEvents } from './events/list.server.emit.even';
import { GatewayClientListsEmitEvents } from './events/list.client.emit.even';
import { GatewayClientListsListenEvents } from './events/list.client.listen.events';

import { ListEditor } from 'src/core/types/event-types/list-editor/client/edit-list-actions';
import { InitializingClientState, InitializingClientTools } from 'src/core/types/event-types/init/init-state-dto';
import { ToolsService } from 'src/modules/list-editor/services/tools/tools.service';
import { WebsocketExceptionsFilter } from 'src/filters/exceptions/websocket-exceptions.filter';

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
@UseFilters(WebsocketExceptionsFilter)
@UsePipes(new ValidationPipe({ transform: true }))
export class ListsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{

  @WebSocketServer()
  server: Namespace;

  private logger: Logger = new Logger('SocketLists');

  /************************************************************* */
  constructor(private readonly toolsService: ToolsService) {}
  /************************************************************* */

  afterInit(server: ServerIo) {}

  async getInitializingState(): Promise<InitializingClientState> {

    if (!this.toolsService.isReady()) await this.toolsService.load();
    const initState: InitializingClientState = {
      tools: this.toolsService.getTools(),
    };
    return initState;
  }

  async handleConnection(client: ClientIo, ...args: string[]): Promise<void> {
    this.logger.log(`Клиент: ${client.id} подключился`);

    const data = await this.getInitializingState();

    client.emit('init', data);
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
  handleListEditor(client: ClientIo, payload: ListEditor): void {
    this.toolsService
      .getListEditorService()
      .act(payload)
      .then(() => {
        const tools = this.toolsService.getTools();
        this.server.emit('tools', tools);
      })
      .catch((e) => {
        console.log('Ошибка отловлена', e);
      });
  }
  /** Запрос на получение всех инструментов. */
  @SubscribeMessage('tools')
  async handleGetTools(): Promise<WsResponse<InitializingClientTools>> {
    if (!this.toolsService.isReady()) await this.toolsService.load();

    return {
      event: 'tools',
      data: this.toolsService.getTools(),
    };
  }

  @SubscribeMessage('createRoom')
  createRoom(@MessageBody() data: string, @ConnectedSocket() client: Socket) {

    client.join(data);
  }
}
