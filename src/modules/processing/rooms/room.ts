import { Server, Socket } from 'socket.io';
import { RoomManager } from '../room-manager';

export type RoomType = 'ORDER_ROOM';

export abstract class Room {
  id: string;
  roomManager: RoomManager;
  roomType: RoomType;

  constructor(roomManager: RoomManager) {
    this.roomManager = roomManager;
  }

  public abstract command(
    server: Server,
    client: Socket,
    ...args: any[]
  ): Promise<void>;

  /** Вызывается при удалении команты.Переопределите, что бы использовать в своих целях. */
  async destroy(): Promise<void> {}
  /** Вызывается после создания команты. Переопределите, что бы использовать в своих целях. */
  async afterCreation(): Promise<void> {}

  update(dt: number): void {}

  setType(roomType: RoomType): this {
    this.roomType = roomType;
    return this;
  }
}
