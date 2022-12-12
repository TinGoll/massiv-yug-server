import { GraphProvider } from 'src/modules/order-processing/providers/graph-provider';
import { OrderCreator } from 'src/modules/order-processing/providers/order-creator';
import { RoomManager } from 'src/modules/order-processing/room-manager/room-manager';
import { Room } from 'src/modules/order-processing/room-manager/rooms/room';
import { BookEntity } from 'src/modules/repository/order/entities/book.entity';
import { EntitySystem } from 'yug-entity-component-system';
import { MYEngine } from '../engine/my-engine';

/**
 * Система для сохранения в базу данных.
 */
export class SaveSystem extends EntitySystem {
  private book: BookEntity;
  private room: Room;
  private orderCreator: OrderCreator;
  private roomManager: RoomManager;
  private graphProvider: GraphProvider;
  constructor() {
    super(SaveSystem);
  }

  /** Переопределяем движок, на расширенный */
  getMYEngine(): MYEngine {
    return this.getEngine<MYEngine>();
  }

  async beforeUpdate(): Promise<void> {
    super.beforeUpdate();
  }

  async afterUpdate(): Promise<void> {
    super.afterUpdate();
  }

  async update(deltaTime: number): Promise<void> {
    await this.saveElements(deltaTime);
    await this.saveDocuments(deltaTime);
    await this.saveBook(deltaTime);
  }

  /** Сохранение елементов */
  async saveElements(deltaTime: number): Promise<void> {}
  /** Сохранение документов */
  async saveDocuments(deltaTime: number): Promise<void> {}
  /** Сохранение книги */
  async saveBook(deltaTime: number): Promise<void> {}
}
