import { Logger } from '@nestjs/common/services';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Namespace, Server, Socket } from 'socket.io';
import { RoomManager } from 'src/modules/processing/room-manager';
import { OrderRoom } from 'src/modules/processing/rooms/order-room/order.room';

@WebSocketGateway({
  namespace: 'orders',
  transports: ['websocket', 'polling', 'flashsocket'],
  cors: {
    origin: '*',
  },
})
export class OrdersGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('OrdersGateway');

  @WebSocketServer()
  server: Namespace;

  constructor(
    private readonly roomManager: RoomManager,
 
  ) {}

  afterInit(server: Server) {
    // Регистрация событий комнат для обработки orders.
    this.server.adapter.on('create-room', async (roomId) => {
      this.logger.log(`Создана новая комната ${roomId}`);

      // Проверка является ли комната комнатой заказа.
      const notification = this.roomManager.isExists(roomId);
      if (notification) this.notificationOpenRooms();
    });

    this.server.adapter.on('delete-room', async (roomId) => {
      this.logger.log(`Комната ${roomId} удалена`);
      // Проверка является ли комната комнатой заказа.
      const notification = this.roomManager.isExists(roomId);
      await this.roomManager.remove(roomId);
      if (notification) this.notificationOpenRooms();
    });

    this.server.adapter.on('join-room', (roomId, id) => {
      this.logger.log(`Пользователь ${id} присоеденился к комнате: ${roomId}`);
      this.notificationRoomVisitors(roomId);
    });

    this.server.adapter.on('leave-room', (roomId, id) => {
      this.logger.log(`Пользователь ${id} ливнул из комнаты: ${roomId}`);
      this.notificationRoomVisitors(roomId);
    });
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Клиент ${client.id} подключился к OrdersGateway`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Клиент ${client.id} отключился от OrdersGateway`);
  }

  /********************************************* */
  /**************** Уведомления **************** */

  async notificationContentList() {
    
  }

  async notificationRoomState(roomId: string) {
    const room = this.roomManager.getRoom<OrderRoom>(roomId);
    if (!room) return null;
    this.server.to(roomId).emit('room-state', room.getRoomState());
  }

  async notificationOpenRooms() {
    this.server.emit('open-rooms', this.roomManager.getRoomNames());
  }

  async notificationRoomVisitors(roomId: string) {
    const notification = this.roomManager.isExists(roomId);
    if (notification) {
      this.server.to(roomId).emit('room-visitors', {
        roomId,
        visitors: [...this.server.adapter.rooms.get(roomId)],
      });
    }
  }

  

  /********************************************* */
  /*********** Работа с комнатами ************** */

  /** Создание нового заказа */
  @SubscribeMessage('order-new')
  async newOrder(
    client: Socket,
    payload: {
      type: string;
    },
  ): Promise<void> {
    // const book = await this.bookService.new(payload.type, client);
    // const room = await this.roomManager.create<OrderRoom>(
    //   book.id,
    //   'ORDER_ROOM',
    //   book,
    // );
    // client.join(room.id);
    // return {
    //   event: 'room-state',
    //   data: room.getRoomState(),
    // };
  }

  /** Открытие существующего заказа */
  @SubscribeMessage('order-open')
  async openOrder(client: Socket, payload: { id: string }): Promise<void> {
    // let room = this.roomManager.getRoom(payload.id);
    // if (!room) {
    //   const book = await this.bookService.load(Number(payload.id), client);
    //   if (!book) return;
    //   room = await this.roomManager.create<OrderRoom>(
    //     book.id,
    //     'ORDER_ROOM',
    //     book,
    //   );
    // }
    // client.join(room.id);
    // return;
  }

  /** Удаление заказа. */
  @SubscribeMessage('order-delete')
  async deleteOrder() {}

  /** Закрытие открытого заказа. */
  @SubscribeMessage('order-close')
  async closeOrder(client: Socket, payload: { id: string }) {
    client.leave(String(payload.id));
  }

  /********************************************* */
  /** Управление заказом с помощью команд */

  /** Команды для создания объектов. */
  @SubscribeMessage('order-command-create')
  async orderCommandCreate(client: Socket, payload: OrderCommandCreate) {}
  /** Комманды для удаления объектов. */
  @SubscribeMessage('order-command-delete')
  async orderCommandDelete(client: Socket, payload: OrderCommandDelete) {}
  /** Комманды для изменения объектов. */
  @SubscribeMessage('order-command-update')
  async orderCommandUpdate(client: Socket, payload: OrderCommandUpdate) {}

  /********************************************* */
}

interface OrderCommandPayload {
  roomId: string | number;
}

interface OrderCommandCreate extends OrderCommandPayload {
  bookAction?: {
    data: any;
  };
  documentAction?: {
    bookId: number;
    data: any;
  };
  elementAction?: {
    documentId: number;
    data: any;
  };
}

interface OrderCommandDelete extends OrderCommandPayload {
  bookAction?: { id: number };
  documentAction?: { id: number[] };
  elementAction?: { id: number[] };
}

interface OrderCommandUpdate extends OrderCommandPayload {
  bookAction?: {
    data: any;
  };
  documentAction?: {
    bookId: number;
    data: any;
  };
  elementAction?: {
    documentId: number;
    data: any;
  };
}
