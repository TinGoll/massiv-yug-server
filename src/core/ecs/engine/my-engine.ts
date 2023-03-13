import { Room } from 'src/modules/order-processing/room-manager/rooms/room';
import { BookEntity } from 'src/modules/repository/order/entities/book.entity';
import { Engine, Entity, ImmutableArray } from 'yug-entity-component-system';
import { MYEntity } from './my-entity';

/** Расширение движка */
export class MYEngine<T extends object = Record<symbol, any>> extends Engine {
  public userData: T = <T>{};

  constructor(readonly bookEntity: BookEntity, readonly room: Room) {
    super();
  }

  // Метож переопределен, для типа сущности.
  getEntities(): ImmutableArray<MYEntity> {
    return <ImmutableArray<MYEntity>>super.getEntities();
  }
}
