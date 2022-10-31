import { Injectable } from '@nestjs/common';
import { Book } from 'src/core/modeles/order/book/book';
import { OrderRoom } from './rooms/order-room/order.room';
import { Room, RoomType } from './rooms/room';

@Injectable()
export class RoomManager {
  private rooms: Map<string, Room> = new Map<string, Room>();

  constructor() {}

  async create<T extends Room = Room>(
    roomId: string | number,
    type: RoomType,
    ...args: any[]
  ): Promise<T> {
    // Создание instace класса комнаты.
    const room = this.getRoomInstance<T>(type, ...args);
    room.id = String(roomId);
    room;
    // Вызов метода до добавления его в менеджер комнат, можно использовать для загрузки.
    // Метод будет обработан синхронно.
    await room.afterCreation();
    this.set(roomId, room);
    return room;
  }

  async remove(roomId: string): Promise<string> {
    // Вызов функции перед удалением из менеджера. Можно использовать для сохранения данных, перед отчисткой.
    await this.get(roomId)?.destroy();
    // Удаление комнаты из коллекции.
    this.delete(roomId);
    return roomId;
  }
  /** Существует ли комната */
  isExists (roomId: string | number): boolean {
    return this.rooms.has(String(roomId));
  }

  /** Получение всех текущих комнат. */
  getRooms(): Map<string, Room> {
    return this.rooms;
  }

  /** Получение комнаты по ключу */
  getRoom<T extends Room = Room>(roomId: string | number): T | null {
    return <T>(this.get(roomId) || null);
  }

  /** Получить имена комнат */
  getRoomNames(): string[] {
    return [...this.rooms.keys()];
  }

  /** Создать инстанс команты с передачей книги заказа. */
  getRoomInstance<T extends Room = Room>(type: RoomType, ...args: any[]): T {
    switch (type) {
      case 'ORDER_ROOM':
        return <T>(new OrderRoom(this).setType(type).setBook(args[0]) as any);
      default:
        throw new Error('Тип комнаты не определен');
    }
  }

  private set(roomId: string | number, room: Room) {
    return this.rooms.set(String(roomId), room);
  }

  private get(roomId: string | number) {
    return this.rooms.get(String(roomId));
  }

  private delete(roomId: string | number) {
    return this.rooms.delete(String(roomId));
  }
}
