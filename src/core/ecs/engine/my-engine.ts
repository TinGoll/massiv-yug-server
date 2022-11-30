import { BookEntity } from 'src/modules/repository/order/entities/book.entity';
import { Engine } from 'yug-entity-component-system';

/** Расширение движка */
export class MYEngine extends Engine {
  constructor(readonly bookEntity: BookEntity) {
    super();
  }
}
