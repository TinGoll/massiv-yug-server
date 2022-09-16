import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

type ClientIo = Socket;
type ServerIo = Server;

@WebSocketGateway({
  transports: ['websocket', 'polling', 'flashsocket'],
  cors: {
    origin: '*',
  },
})
export class AuthorizationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor() {}

  @WebSocketServer()
  server: ServerIo;

  private logger: Logger = new Logger('SocketAuthorization');

  afterInit(server: ServerIo) {}

  handleConnection(client: ClientIo, ...args: any[]) {
    this.logger.log('Клиент: ' + client);
    this.logger.log(args);
  }

  handleDisconnect(client: ClientIo) {
    this.logger.log(`Клиент: ${client.id} отключился`);
  }

  @SubscribeMessage('message')
  handleMessage(client: ClientIo, payload: any): string {
    return 'Hello world!';
  }
}
