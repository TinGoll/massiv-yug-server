import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { BehaviorSubject, concatMap, interval, Subscription } from 'rxjs';
import { Room } from './rooms/room';

@Injectable()
export class RoomManager {
  private rooms: Map<string, Room> = new Map<string, Room>();
  private logger: Logger = new Logger('Room Manager');

  private interval$: Subscription;
  private timeSnapshot: number = Date.now();
  private readonly update$ = new BehaviorSubject<number>(this.timeSnapshot);

  constructor() {}

  /**
   * Метод обновления системы комнат. По очередно вызывает метод update
   * в каждой активной комнате, передавая в качестве аргумента, время
   * прошедшее между тактами.
   * @param dt Время прошедшее между тактами.
   */
  async update(dt: number): Promise<void> {
    this.logger.verbose(dt);
    for (const room of this.rooms) {
      await room[1].update(dt);
      this.logger.verbose(`Комната: ${room[0]} обновлена.`);
    }
  }

  /**
   * Метод вызывается, после того как отработал метод update
   */
  postUpdate(): void {}

  /** Запуск генератора тактов. */
  start(): void {
    this.interval$ = interval(1000)
      .pipe(concatMap((v) => this.update(this.nextDelta())))
      .subscribe({
        next: this.postUpdate.bind(this),
      });
  }
  /** Остановка генератора тактов. */
  stop(): void {
    this.interval$?.unsubscribe();
  }

  private nextDelta(): number {
    const now = Date.now();
    const dt = now - this.timeSnapshot;
    this.timeSnapshot = now;
    return dt;
  }

  private intervalAction(value: number) {
    this.logger.verbose('interval данные ' + value);
  }
}
