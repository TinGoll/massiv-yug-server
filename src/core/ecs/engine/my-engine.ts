import { Room } from 'src/modules/order-processing/room-manager/rooms/room';
import { BookEntity } from 'src/modules/repository/order/entities/book.entity';
import { Engine } from 'yug-entity-component-system';

/** Расширение движка */
export class MYEngine<T extends object = Record<symbol, any>> extends Engine {
  public UserData: T;
  constructor(readonly bookEntity: BookEntity, readonly room: Room) {
    super();
  }
}
