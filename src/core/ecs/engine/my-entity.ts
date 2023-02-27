import { Entity } from 'yug-entity-component-system';
import nanoid from 'src/core/common/nanoid';
import { BookEntity } from 'src/modules/repository/order/entities/book.entity';
import { ElementEntity } from 'src/modules/repository/order/entities/document.element.entity';
import { DocumentEntity } from 'src/modules/repository/order/entities/document.entity';

/** Рассширенный клас Entity движка */
export class MYEntity extends Entity {
  public needToSave?: boolean = false;
  constructor(
    readonly elementEntity: ElementEntity,
    readonly documentEntity: DocumentEntity,
    readonly bookEntity: BookEntity,
  ) {
    /** Вызываем конструктор супер-класса */
    super();
    /** Присваиваем id сущности базы данных */
    this.id = elementEntity.id;
    /** Присваиваем уникальный ключ */
    this.key = nanoid(6);
  }

  
}
