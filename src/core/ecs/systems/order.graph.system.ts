import { ArrayWorkData, WorkElementData } from 'src/core/@types/app.types';
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
import { GeometryComponent } from '../components/geometry.component';
import { MYEntity } from '../engine/my-entity';

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
    const entityWorks: EntityWorks[] = [];

    console.log("РАСЧЕТ ГАРАФА");
    

    for (const entity of entities) {
      entityWorks.push({
        entity,
        queue: new QueueCollection(this.comparator),
      });
    }

    console.log('РАСЧЕТ ГАРАФА набрали коллекцию');

    for (const ew of entityWorks) {
      console.log(ew.entity.elementEntity.name);
      
      // Получаем компонент геометрии.
      const geoCmp =
        ew.entity.getComponent<GeometryComponent>(GeometryComponent);
      // Получаем компонент работ
      const workCmp = ew.entity.getComponent<WorkComponent>(WorkComponent);
      // Получаем компонент филёнок.
      const panelCmp = ew.entity.getComponent<PanelComponent>(PanelComponent);
      // Получаем работы элементов

      const entWorkData = (workCmp?.data?.workData || []).map((wd) => ({
        ...wd,
        geometry: geoCmp.data,
        name: ew.entity.elementEntity.name,
      }));
      // Получаем гемметрию сущности.

      // Получаем работы филёнок
      const panelsWorkData =
        panelCmp?.data?.panels?.reduce<ArrayWorkData>((acc, item) => {
          const workData = (item?.workData || []).map((wd) => ({
            ...wd,
            geometry: item.geometry,
            name: item.type,
          }));
          acc.push(...workData);
          return acc;
        }, []) || [];

      // получаем работы рубашек.
      const shirtWorkData =
        panelCmp?.data?.panels?.reduce<ArrayWorkData>((acc, item) => {
          const workData = (item?.workData || []).map((wd) => ({
            ...wd,
            geometry: item.shirt.geometry,
            name: 'Рубашка',
          }));
          acc.push(...workData);
          return acc;
        }, []) || [];

      // Распределяем работы в особом порядке, сначала рыботы рубашек, потом филёнок, после элементов
      // Задумка Даника, посмотрим как это будет работать.
      shirtWorkData.forEach((w) => ew.queue.append(w));
      panelsWorkData.forEach((w) => ew.queue.append(w));
      entWorkData.forEach((w) => ew.queue.append(w));
    }

    console.log('РАСЧЕТ ГАРАФА сделали очередь');

    // Создаем граф заказа.
    this.book.graph = this.graphProvider.createOrderGraph();

    const queue = this.book.graph.queue((node) => {
      const blank = {
        name: node.options.name,
        data: [],
      };
      for (const workElementData of node.options.workData) {
        const sample = this.getWork(workElementData.workId);
        const blankData = {
          sample,
          blankList: [],
        };
        console.log('------------ ' + node.id + ' -------------');
        for (const ew of entityWorks) {
          if (node.options.takeOne) {
            const qws = ew.queue.findAndTake((v) => v.workId === sample.id);
            if (qws) {
              blankData.blankList.push(qws);
            }
          } else {
            let next_qws = true;
            while (next_qws) {
              next_qws = false;
              const qws = ew.queue.findAndTake((v) => v.workId === sample.id);
              if (qws) {
                blankData.blankList.push(qws);
                next_qws = true;
              }
            }
          }
        }
        blank.data.push(blankData);
      }
      return blank;
    });
    console.log(JSON.stringify(queue, null, 2));
  }
  comparator(A: WorkElementData, B: WorkElementData) {
    if (Number(A.workId) === Number(B.workId)) return 0;
    return 1;
  }

  getWork(workId: number) {
    return this.book.works.find((w) => w.id === workId) || null;
  }
}
