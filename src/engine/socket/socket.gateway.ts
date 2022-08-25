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
import {
  InitializingClientState,
  InitializingClientTools,
} from '../core/interfaces/dtos/server-dtos/init-state-dto';
import { ListEditor } from '../core/interfaces/dtos/client-dtos/edit-list-dto';
import { ClientToServerEvents } from '../core/interfaces/client-to-server-events';
import { ServerToClientEvents } from '../core/interfaces/server-to-client-events';
import { ToolsService } from '../services/tools/tools.service';

@WebSocketGateway({
  transports: ['websocket', 'polling', 'flashsocket'],
  cors: {
    origin: '*',
  },
})
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('SocketGateway');

  /************************************************************* */
  constructor(private readonly toolsService: ToolsService) {}
  /************************************************************* */

  afterInit(server: Server) {}

  getInitializingState(): InitializingClientState {
    const initState: InitializingClientState = {
      tools: this.toolsService.getTools(),
    };
    return initState;
  }

  handleConnection(
    client: Socket<
      ServerToClientEvents,
      ServerToClientEvents,
      ClientToServerEvents
    >,
    ...args: string[]
  ): void {
    this.logger.log(`Клиент: ${client.id} подключился`);
    client.emit('init', this.getInitializingState());
    client.broadcast.emit('log', {
      ts: Date.now(),
      msg: `Клиент: ${client.id} подключился.`,
    });
  }

  handleDisconnect(client: Socket) {
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
    client: Socket,
    payload: ListEditor,
  ): WsResponse<InitializingClientTools> {
    this.logger.log(JSON.stringify(payload, null, 2));
    this. toolsService.getListEditorService().act(payload);

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
