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
import { map, Observable, of, tap, switchMap, iif, from } from 'rxjs';
import { Namespace, Socket } from 'socket.io';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { PersonEntity } from 'src/modules/person/entities/person.entity';

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

    this.logger.debug(action);

    return this.roomManager
      .createOrder(
        client.data.user,
        action.payload?.option,
        // Подписка на получения состояния комнаты
        // РЕАЛИЗОВАТЬ ОТПИСКУ ПРИ ВЫХОДЕ ИЗ КОМНАТЫ
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

    if (!client.rooms.has(String(action.payload))) {
      // Подписываем клиента на новую комнату.
      client.join(String(action.payload));
    }
    return this.roomManager
      .openOrder(
        client.data.user,
        action.payload,
        // Подписка на получения состояния комнаты
        // РЕАЛИЗОВАТЬ ОТПИСКУ ПРИ ВЫХОДЕ ИЗ КОМНАТЫ
        (roomId, state) =>
          this.notification(roomId, processingEvents.ORDER_STATE, state),
      )
      .pipe(map((book) => ({ event, data: { book, roomId: book.id } })));
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

  /** События связанные с редактированием документов и элементов */
  @SubscribeMessage(processingEvents.ORDER_ACTION)
  orderAction(client: Socket, action: PayloadAction<Processing.Action>): any {
    const event = processingEvents.ORDER_ACTION;
    return of(this.roomManager.isExists(action.payload.roomId))
      .pipe(
        switchMap((isExists) =>
          iif(
            () => isExists,
            of([client.data.user, action.payload.roomId, action.payload]),
            this.openOrder(client, {
              payload: action.payload.roomId,
            }).pipe(
              map((openResponse) => {
                return [
                  client.data.user,
                  action.payload.roomId,
                  action.payload,
                ];
              }),
            ),
          ),
        ),
      )
      .pipe(
        switchMap((args: [PersonEntity, RoomKeyType, Processing.Action]) => {
          return this.roomManager.action(...args).pipe(
            map((data) => ({
              event,
              data,
            })),
            // tap(() => {
            //   // Сохранение книги, после отправки данных.
            //   const [_, roomKey] = args;
            //   from(this.roomManager.get(roomKey)?.save());
            // }),
          );
        }),
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
          `Пользователь ${
            server.sockets.get(id)?.data?.user.login
          } присоеденился к комнате: ${roomId}`,
        );
      }
    });

    // Клиент покинул комнату.
    server.adapter.on('leave-room', (roomId, id) => {
      if (this.roomManager.has(roomId)) {
        this.logger.verbose(
          `Пользователь ${
            server.sockets.get(id)?.data?.user.login
          } покинул комнату: ${roomId}`,
        );
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
  handleDisconnect(client: Socket<any, any, any, { user: PersonEntity }>) {
    this.logger.verbose(
      `handleDisconnect: ${client.data?.user?.login || client.id}`,
    );
  }
}
