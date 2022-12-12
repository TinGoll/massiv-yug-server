import { ArrayWorkData, WorkElementData } from 'src/core/@types/app.types';
import { QueueCollection } from 'src/core/common/queue-collection/QueueCollection';
import { GraphProvider } from 'src/modules/order-processing/providers/graph-provider';
import { OrderCreator } from 'src/modules/order-processing/providers/order-creator';
import { RoomManager } from 'src/modules/order-processing/room-manager/room-manager';
import { Room } from 'src/modules/order-processing/room-manager/rooms/room';
import { BookEntity } from 'src/modules/repository/order/entities/book.entity';
import {
  BaseSystem,
  Entity,
  Family,
  ImmutableArray,
} from 'yug-entity-component-system';
import { PanelComponent } from '../components/panel.component';
import { WorkComponent } from '../components/work.component';
import { MYEngine } from '../engine/my-engine';

interface EntityWorks {
  entity: Entity;
  queue: QueueCollection<WorkElementData>;
}
/**
 * Система для создания шрафа заказа.
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

  async startProcessing(): Promise<void> {
    this.book = this.getMYEngine().bookEntity;
    this.room = this.getMYEngine().room;
    this.roomManager = this.room.roomManager;
    this.orderCreator = this.roomManager.orderCreator;
    this.graphProvider = this.roomManager.graphProvider;
  }

  protected async processEntities(
    entities: ImmutableArray<Entity>,
    deltaTime: number,
  ): Promise<void> {
    const entityWorks: EntityWorks[] = [];

    for (const entity of entities) {
      entityWorks.push({
        entity,
        queue: new QueueCollection(this.comparator),
      });
    }

    for (const ew of entityWorks) {
      // Получаем компонент работ
      const workCmp = ew.entity.getComponent<WorkComponent>(WorkComponent);
      // Получаем компонент филёнок.
      const panelCmp = ew.entity.getComponent<PanelComponent>(PanelComponent);
      // Получаем работы элементов
      const entWorkData = workCmp?.data?.workData || [];
      // Получаем работы филёнок
      const panelsWorkData =
        panelCmp?.data?.panels?.reduce<ArrayWorkData>((acc, item) => {
          acc.push(...(item?.workData || []));
          return acc;
        }, []) || [];
      // получаем работы рубашек.
      const shirtWorkData =
        panelCmp?.data?.panels?.reduce<ArrayWorkData>((acc, item) => {
          acc.push(...(item?.shirt?.workData || []));
          return acc;
        }, []) || [];

      // Распределяем работы в особом порядке, сначала рыботы рубашек, потом филёнок, после элементов
      // Задумка Даника, посмотрим как это будет работать.
      shirtWorkData.forEach((w) => ew.queue.append(w));
      panelsWorkData.forEach((w) => ew.queue.append(w));
      entWorkData.forEach((w) => ew.queue.append(w));
    }

    this.book.graph = this.graphProvider.createOrderGraph();

    this.book.graph.queue((node) => {
      // console.log(JSON.stringify(node, null, 2));
      
    })
  }

  comparator(A: WorkElementData, B: WorkElementData) {
    if (Number(A.workId) === Number(B.workId)) return 0;
    return 1;
  }
}
