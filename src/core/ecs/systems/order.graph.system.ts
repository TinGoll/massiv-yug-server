import { WorkElementData } from 'src/core/@types/app.types';
import { QueueCollection } from 'src/core/common/queue-collection/QueueCollection';
import { GraphProvider } from 'src/modules/order-processing/providers/graph-provider';
import { OrderCreator } from 'src/modules/order-processing/providers/order-creator';
import { RoomManager } from 'src/modules/order-processing/room-manager/room-manager';
import { Room } from 'src/modules/order-processing/room-manager/rooms/room';
import { BookEntity } from 'src/modules/repository/order/entities/book.entity';
import {
  BaseSystem,
  Family,
  ImmutableArray,
} from 'yug-entity-component-system';
import { PanelComponent } from '../components/panel.component';
import { WorkComponent } from '../components/work.component';
import { MYEngine } from '../engine/my-engine';
import { BookState } from 'src/modules/repository/order/entities/book.state';

import { MYEntity } from '../engine/my-entity';
import { OrderGraph } from 'src/core/common/graph/order-graph';

interface EntityWorks {
  entity: MYEntity;
  queue: QueueCollection<WorkElementData>;
}
/**
 * Система для создания графа заказа.
 */
export class OrderGraphSystem extends BaseSystem {
  private book: BookEntity;
  private room: Room;
  private orderCreator: OrderCreator;
  private roomManager: RoomManager;
  private graphProvider: GraphProvider;
  constructor() {
    super(OrderGraphSystem, Family.one(PanelComponent, WorkComponent).get());
  }

  /** Переопределяем движок, на расширенный */
  getMYEngine(): MYEngine {
    return this.getEngine<MYEngine>();
  }

  /** Код запускается перед обновлением, можно использовать для решения об отключении системы и. т. д. */
  async beforeUpdate(): Promise<void> {
    const book = this.getMYEngine().bookEntity;
    if (book && book.state === BookState.CALCULATION_OF_BLANKS) {
      this.setProcessing(true);
    } else {
      this.setProcessing(false);
    }
  }

  async startProcessing(): Promise<void> {
    this.book = this.getMYEngine().bookEntity;
    this.room = this.getMYEngine().room;
    this.roomManager = this.room.roomManager;
    this.orderCreator = this.roomManager.orderCreator;
    this.graphProvider = this.roomManager.graphProvider;
  }

  protected async processEntities(
    entities: ImmutableArray<MYEntity>,
    deltaTime: number,
  ): Promise<void> {
    // Создаем граф заказа.
    if (this.book.graph && this.book.graph.isBuilt) {
      this.room.orderGraph = OrderGraph.deSerialization(this.book.graph);
    } else {
      const graph = this.graphProvider.createOrderGraph();
      this.room.orderGraph = graph;
      this.book.graph = graph.serialization();
    }
  }
}
