import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import {
  BehaviorSubject,
  concatMap,
  interval,
  Subscription,
  Observable,
  from,
} from 'rxjs';
import { ComponentMapper } from '../providers/component-mapper';
import { OrderCreator } from '../providers/order-creator';
import { Room } from './rooms/room';

@Injectable()
export class RoomManager {
  private rooms: Map<string, Room> = new Map<string, Room>();
  private logger: Logger = new Logger('Room Manager');

  private interval$: Subscription;
  private timePeriod = 1000;
  private timeSnapshot: number = Date.now();
  private readonly update$ = new BehaviorSubject<number>(this.timeSnapshot);

  constructor(
    private readonly orderCreator: OrderCreator,
    private readonly componentMapper: ComponentMapper,
  ) {
    this.start();
    this.openOrder(24621);
  }

  /**
   * Открытие заказа в системе комнат, для обработки.
   * @param id
   */
  openOrder(id: number): void {
    const book = from(this.orderCreator.openBook(id)).subscribe((response) => {
      if (response) {
        const room = new Room(this, response, this.componentMapper);
        /** Перед добавлением комнаты в менеджер комнат, вызываем спец-метод. */
        room.afterCreation().then(() => this.set(id, room));
      }
      return book.unsubscribe();
    });
    // book.unsubscribe();
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
  postUpdate(): void {}

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

  public set(roomId: string | number, room: Room) {
    return this.rooms.set(String(roomId), room);
  }

  public get(roomId: string | number) {
    return this.rooms.get(String(roomId));
  }

  public delete(roomId: string | number) {
    return this.rooms.delete(String(roomId));
  }
}
