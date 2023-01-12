import { Logger, UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { map, max, Observable, of, tap, catchError } from 'rxjs';
import { Namespace, Socket } from 'socket.io';
import {
  AllowNullUserGuard,
  JwtAuthGuard,
} from 'src/modules/auth/guards/jwt-auth.guard';
import { AuthService } from 'src/modules/auth/services/auth.service';

import Processing, {
  RoomKeyType,
} from '../room-manager/actions/processing-actions';
import { RoomManager } from '../room-manager/room-manager';
import { PayloadAction } from './interfaces';
import processingEvents from './processing.events';

@WebSocketGateway({
  namespace: '/order-processing',
  cors: {
    origin: '*',
  },
})
export class ProcessingGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  // Сокет сервер. Namespace - расширяет тип сервера, для конкретного пространства.
  @WebSocketServer() wss: Namespace;
  // Логер
  private logger: Logger = new Logger('ProcessingGateway');

  constructor(
    private readonly roomManager: RoomManager,
    private readonly authService: AuthService,
  ) {}

  /********************************************************************************* */
  /************************ События для работы с заказом *************************** */
  /********************************************************************************* */

  // Создание книги заказа.
  @SubscribeMessage(processingEvents.CREATE_ORDER)
  createOrder(
    client: Socket,
    action: PayloadAction<Processing.CreateOrderAction>,
  ): Observable<WsResponse<Processing.CreateOrderResponse>> {
    const event = processingEvents.CREATE_ORDER;

    this.logger.debug(action)

    return this.roomManager
      .createOrder(
        client.data.user,
        action.payload?.option,
        // Подписка на получения состояния комнаты
        (roomId, state) =>
          this.notification(roomId, processingEvents.ORDER_STATE, state),
      )
      .pipe(
        map((book) => ({ event, data: { book, roomId: book.id } })),
        tap((response) => {
          // Присоеденяем клиента к комнате.
          client.join(String(response?.data?.roomId));
          return response;
        }),
      );
  }

  // Открытие книги заказа.
  @SubscribeMessage(processingEvents.OPEN_ORDER)
  openOrder(
    client: Socket,
    action: PayloadAction<Processing.OpenOrderAction>,
  ): Observable<WsResponse<Processing.OpenOrderResponse>> {
    const event = processingEvents.OPEN_ORDER;
    return this.roomManager
      .openOrder(
        action.payload,
        // Подписка на получения состояния комнаты
        (roomId, state) =>
          this.notification(roomId, processingEvents.ORDER_STATE, state),
      )
      .pipe(
        map((book) => ({ event, data: { book, roomId: book.id } })),
        tap((response) => {
          // Присоеденяем клиента к комнате.
          client.join(String(response?.data?.roomId));
          return response;
        }),
      );
  }
  // Закрытие книги.
  // Книга закрывается только для текущего клиента.
  // Фактическое закрытие книги происходит автоматически
  // Когда в комнате не останеться клиентов.
  @SubscribeMessage(processingEvents.CLOSE_ORDER)
  closeOrder(
    client: Socket,
    action: PayloadAction<Processing.CloseOrderAction>,
  ): Observable<WsResponse<Processing.CloseOrderResponse>> {
    const event = processingEvents.CLOSE_ORDER;
    const roomId = String(action?.payload);
    client.leave(roomId);
    return of({
      event,
      data: { roomId },
    });
  }

  /**
   * Добавление нового документа в книгу закзов
   * @param client Сокет Клиент
   * @param action Набор опций для создания документа.
   * @returns AddDocumentResponse
   */
  @SubscribeMessage(processingEvents.ADD_DOCUMENT)
  addDocument(
    client: Socket,
    action: PayloadAction<Processing.AddDocumentAction>,
  ): Observable<WsResponse<Processing.AddDocumentResponse>> {
    const event = processingEvents.ADD_DOCUMENT;
    return this.roomManager
      .addDocument(action?.payload?.bookId!, action?.payload?.option)
      .pipe(map((document) => ({ event, data: { document } })));
  }

  /** События связанные с редактированием документов и элементов */
  @SubscribeMessage(processingEvents.OPEN_ORDER)
  orderAction(
    client: Socket,
    action: PayloadAction<Processing.Action>,
  ): Observable<WsResponse<any>> {
    const event = processingEvents.ORDER_ACTION;
    return this.roomManager
      .action(1, action.payload.roomId, action.payload)
      .pipe(
        map((data) => ({
          event,
          data,
        })),
      );
  }

  /********************************************************************************* */
  // События, обработка комнат и клиентов

  /**
   * Функция для широковещательной рассылки
   * @param roomId id комнаты в которую отпарвляем сообщение
   * @param event эвент рассылки
   * @param args аргументы для отпарвки.
   * @returns boolean
   */
  notification(
    roomId: RoomKeyType,
    event: string,
    ...args: any[]
  ): Observable<boolean> {
    return of(this.wss.to(String(roomId)).emit(event, ...args));
  }

  afterInit(server: Namespace) {
    // Комната создана
    server.adapter.on('create-room', async (roomId) => {
      this.logger.verbose(`Создана новая комната ${roomId}`);
    });

    // Комната удалена
    server.adapter.on('delete-room', async (roomId) => {
      this.logger.verbose(`Комната ${roomId} удалена`);
      this.roomManager.closeRoom(roomId);
    });

    // Клиент присоеденился к комнате
    server.adapter.on('join-room', (roomId, id) => {
      if (roomId !== id) {
        this.logger.verbose(
          `Пользователь ${id} присоеденился к комнате: ${roomId}`,
        );
      }
    });

    // Клиент покинул комнату.
    server.adapter.on('leave-room', (roomId, id) => {
      if (this.roomManager.has(roomId)) {
        this.logger.verbose(`Пользователь ${id} ливнул из комнаты: ${roomId}`);
      }
    });
  }

  @UseGuards(JwtAuthGuard)
  // Присоеденился новый клиент к текущему пространству
  handleConnection(client: Socket, ...args: any[]) {
    const token = (client.handshake.headers.authorization || '').split(' ')[1];

    try {
      this.authService
        .decodedToken(token)
        .pipe(map((data) => data.user))
        .pipe(
          tap((user) => {
            client.data.user = user;
            return user;
          }),
        )
        .subscribe({
          error(err) {
            client.emit('unauthorized', { error: 'unauthorized' });
            client.disconnect();
          },
        });
    } catch (error) {
      // client.disconnect();
    }

    // this.logger.verbose(
    //   `handleConnection: ${JSON.stringify(client.handshake.headers, null, 2)}`,
    // );
    // console.log(client.handshake.auth);
  }
  // Клиент отсоеденился.
  handleDisconnect(client: Socket) {
    this.logger.verbose(`handleDisconnect: ${client.id}`);
  }
}
