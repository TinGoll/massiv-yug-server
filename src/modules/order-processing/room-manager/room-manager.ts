import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { WsException } from '@nestjs/websockets/errors/ws-exception';
import {
  BehaviorSubject,
  concatMap,
  interval,
  Subscription,
  from,
  Observable,
  tap,
  map,
  of,
  mergeMap,
  catchError,
} from 'rxjs';
import { DocumentOptions } from 'src/core/@types/app.types';
import { PersonEntity } from 'src/modules/person/entities/person.entity';
import { BookEntity } from 'src/modules/repository/order/entities/book.entity';
import { DocumentEntity } from 'src/modules/repository/order/entities/document.entity';
import { BookCreateInput } from 'src/modules/repository/order/inputs/book.input';
import { ComponentMapper } from '../providers/component-mapper';
import { GraphProvider } from '../providers/graph-provider';
import { OrderCreator } from '../providers/order-creator';
import Processing, { RoomKeyType } from './actions/processing-actions';
import { RoomEventListener, RoomEventStateListener } from './interfaces';
import { Room } from './rooms/room';
import { HistoryService } from '../services/history.service';

@Injectable()
export class RoomManager {
  private rooms: Map<string, Room> = new Map<string, Room>();
  private logger: Logger = new Logger('Room Manager');

  private interval$: Subscription;
  private timePeriod = 1000;
  private timeSnapshot: number = Date.now();
  private readonly update$ = new BehaviorSubject<number>(this.timeSnapshot);

  constructor(
    public readonly orderCreator: OrderCreator,
    public readonly componentMapper: ComponentMapper,
    public readonly graphProvider: GraphProvider,
    public readonly historyService: HistoryService,
  ) {
    // this.start();
    // this.openOrder(24621);
    // this.createOrder();
  }

  /**
   * Добавить новый документ в книгу заказов
   * @param bookId id книги
   * @param options Набор опций для создания документа.
   * @returns DocumentEntity
   */
  addDocument(
    bookId: number,
    options?: DocumentOptions,
  ): Observable<DocumentEntity> {
    const room = this.get(bookId);
    if (!room) {
      return of(null);
    }
    return from(room.addDocument(options)).pipe(
      tap(() => {
        room.update(0);
      }),
    );
  }

  /**
   * Открытие заказа в системе комнат, для обработки.
   * @param id
   */
  openOrder(
    author: PersonEntity,
    id: RoomKeyType,
    listener?: RoomEventStateListener,
  ): Observable<BookEntity> {
    console.log('Открытие комнаты');
    const candidate = this.get(id);
    if (candidate) {
      // Отправить подключенному пользователю состояние комнаты.
      return of(candidate.book);
    }
    return from(this.orderCreator.openBook(id))
      .pipe(
        map((book) => {
          if (book) {
            const room = new Room(this, book, this.componentMapper);
            room.on('state', listener);
            /** Перед добавлением комнаты в менеджер комнат, вызываем спец-метод. */
            this.set(book.id, room);
            room.afterCreation();
            // Ручное обновление.
            room.update(0);
            return room.book;
          }
          return null;
        }),
        catchError((error) => {
          console.error('Error in open book operation:', error);
          return of(null);
        }),
      )
      .pipe(
        tap((book) => {
          this.historyService
            .push(author, book, 'open', 'Открытие заказа')
            .subscribe();
        }),
        catchError((error) => {
          console.error('Error in push history operation:', error);
          return of(null);
        }),
      );
  }
  /**
   * Создание нового заказа.
   */
  createOrder(
    author: PersonEntity,
    option?: BookCreateInput,
    listener?: RoomEventStateListener,
  ): Observable<BookEntity> {
    return from(this.orderCreator.addBook(author, option))
      .pipe(
        map((book) => {
          if (book) {
            const room = new Room(this, book, this.componentMapper);
            room.on('state', listener);
            /** Перед добавлением комнаты в менеджер комнат, вызываем спец-метод. */
            this.set(book.id, room);
            room.afterCreation();
            // Ручное обновление.
            room.update(0);
            return room.book;
          }
          return null;
        }),
      )
      .pipe(
        tap((book) => {
          this.historyService
            .push(author, book, 'create', 'Создание заказа')
            .subscribe();
          this.historyService
            .push(author, book, 'open', 'Открытие заказа')
            .subscribe();
        }),
      );
  }

  /** Закрывает книгу заказа. */
  closeRoom(id: RoomKeyType): void {
    if (this.has(id)) {
      const room = this.get(id);
      room.dispose().then(() => this.delete(room.id));
    }
  }

  /** Существует ли открытая книга в коллекции. */
  isExists(id: number | string): boolean {
    return this.has(id);
  }

  /**
   * Основной метод управления заказом через систему комнат.
   * @param authorId id автора события.
   * @param act объект - событие.
   */
  action(
    author: PersonEntity,
    roomId: RoomKeyType,
    act: Processing.Action,
  ): Observable<any> {
    const room = this.get(roomId);

    if (!room) {
      throw new WsException('Комната закрыта или не существует.');
    }
    return from(room.act(author, act)).pipe(
      concatMap((data) => {
        // После обнолвения комнаты и отправки состояния на клиенты, сохраняем книгу заказа
        return from(room.update(0)).pipe(concatMap(() => room.save()));
      }),
    );
  }

  /**
   * Метод обновления системы комнат. По очередно вызывает метод update
   * в каждой активной комнате, передавая в качестве аргумента, время
   * прошедшее между тактами.
   * @param dt Время прошедшее между тактами.
   */
  async update(dt: number): Promise<void> {
    for (const room of this.rooms) {
      await room[1].update(dt);
      //   this.logger.verbose(`Комната: ${room[0]} обновлена.`);
    }
  }

  /**
   * Метод вызывается, после того как отработал метод update
   */
  postUpdate(): void {
    console.log('postUpdate');
  }

  /** Запуск генератора тактов. */
  start(): void {
    this.interval$ = interval(this.timePeriod)
      .pipe(concatMap((v) => this.update(this.deltaTime())))
      .subscribe({
        next: this.postUpdate.bind(this),
      });
  }
  /** Остановка генератора тактов. */
  stop(): void {
    this.interval$?.unsubscribe();
  }
  private deltaTime(): number {
    const now = Date.now();
    const dt = now - this.timeSnapshot;
    this.timeSnapshot = now;
    return dt;
  }

  public getOrderCreator() {
    return this.orderCreator;
  }

  public set(roomId: string | number, room: Room) {
    return this.rooms.set(String(roomId), room);
  }

  public get(roomId: string | number) {
    return this.rooms.get(String(roomId));
  }

  public delete(roomId: string | number) {
    return this.rooms.delete(String(roomId));
  }

  public has(roomId: string | number) {
    return this.rooms.has(String(roomId));
  }
}
