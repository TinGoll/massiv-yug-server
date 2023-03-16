import {
  BaseSystem,
  Entity,
  Family,
  ImmutableArray,
} from 'yug-entity-component-system';
import { MYEntity } from '../engine/my-entity';
import { WorkComponent } from '../components/work.component';
import { GeometryComponent } from '../components/geometry.component';
import { MYEngine } from '../engine/my-engine';
import { BookState } from 'src/modules/repository/order/entities/book.state';
import { BookEntity } from 'src/modules/repository/order/entities/book.entity';
import { WorkData, WorkElementData } from 'src/core/@types/app.types';
import { GraphProvider } from 'src/modules/order-processing/providers/graph-provider';
import { OrderCreator } from 'src/modules/order-processing/providers/order-creator';
import { RoomManager } from 'src/modules/order-processing/room-manager/room-manager';
import { Room } from 'src/modules/order-processing/room-manager/rooms/room';
import { QueueCollection } from 'src/core/common/queue-collection/QueueCollection';
import { SampleElementEntity } from 'src/modules/repository/order/entities/element.entity';
import { PanelComponent } from '../components/panel.component';
import { Geometry } from 'src/core/common/models/geometry';

interface QueueWork {
  name: string;
  type: string;
  geometry: Geometry;
  data: WorkData & { id: number };
}

interface EntityQueues {
  entity: MYEntity;
  sample: SampleElementEntity;
  queue: QueueCollection<QueueWork>;
}

export class OrderBlankSystem extends BaseSystem {
  private book: BookEntity;
  private room: Room;
  private orderCreator: OrderCreator;
  private roomManager: RoomManager;
  private graphProvider: GraphProvider;
  constructor() {
    super(OrderBlankSystem, Family.all(GeometryComponent, WorkComponent).get());
  }

  async startProcessing(): Promise<void> {
    this.book = this.getEngine<MYEngine>().bookEntity;
    this.room = this.getEngine<MYEngine>().room;
    this.roomManager = this.room.roomManager;
    this.orderCreator = this.roomManager.orderCreator;
    this.graphProvider = this.roomManager.graphProvider;
  }

  // Код запускается перед обновлением, можно использовать для решения об отключении системы и. т. д. */
  async beforeUpdate(): Promise<void> {
    const book = this.getEngine<MYEngine>().bookEntity;
    console.log('book.state', book.state);

    if (book && book.state === BookState.CALCULATION_OF_BLANKS) {
      this.setProcessing(true);
    } else {
      this.setProcessing(false);
    }
  }

  protected async processEntities(
    entities: ImmutableArray<MYEntity>,
    deltaTime: number,
  ): Promise<void> {
    try {
      const entityQueues: EntityQueues[] = [];
      // Собираем массив, включающий в себя элемент, его шаблон и коллекцию очереди.
      for (const entity of entities) {
        const element = entity.elementEntity;
        const sample = await element.sample;
        entityQueues.push({
          entity,
          sample,
          queue: new QueueCollection(this.comparator),
        });
      }

      for (const entityQueue of entityQueues) {
        const entity = entityQueue.entity; // Сущность
        const sample = entityQueue.sample; // Шаблон элемента
        const queue = entityQueue.queue; // Очередь работ.
        const element = entity.elementEntity; // Элемент

        // Комопненты
        // Получаем компонент геометрии.
        const geometry =
          entity.getComponent<GeometryComponent>(GeometryComponent)?.data;
        // Получаем компонент работ
        const works = entity.getComponent<WorkComponent>(WorkComponent)?.data;
        // Получаем компонент филёнок.
        const panels =
          entity.getComponent<PanelComponent>(PanelComponent)?.data?.panels;

        // Получаем работы элементов
        const elementWorks: QueueWork[] = []; // Работы элемента.
        const panelWorks: QueueWork[] = []; //  Работы вложенных деталей (Филёнка)
        const shirtWorks: QueueWork[] = []; //  Работы вложенных деталей (Рубашка филёнки)
        const profileWorks: QueueWork[] = []; // Работы вложенных деталей (Профиль)
        // Заполняем массив работ элемента.
        elementWorks.push(
          ...(works.workData || []).map((item) => {
            const work = this.getWork(item.workId) || {};
            const workItem: QueueWork = {
              name: element.name,
              type: sample.name,
              geometry: geometry,
              data: {
                ...work,
                id: item.workId,
                ...item.data,
              },
            };
            return workItem;
          }),
        );
        // Запоолняем массив работ для филёнок.
        panelWorks.push(
          ...(panels || []).reduce<QueueWork[]>((acc, panel) => {
            const temp = (panel?.workData || []).map((item) => {
              const work = this.getWork(item.workId) || {};
              const workItem: QueueWork = {
                name: panel.name,
                type: panel.type,
                geometry: panel.geometry,
                data: {
                  ...work,
                  id: item.workId,
                  ...item.data,
                },
              };
              return workItem;
            });
            acc.push(...temp);
            return acc;
          }, []),
        );

        // Запоолняем массив работ для рубашек филёнок.
        shirtWorks.push(
          ...(panels || []).reduce<QueueWork[]>((acc, panel) => {
            const shirt = panel.shirt;
            if (!shirt) {
              return acc;
            }
            const temp = (shirt?.workData || []).map((item) => {
              const work = this.getWork(item.workId) || {};
              const workItem: QueueWork = {
                name: shirt?.name,
                type: 'Рубашка',
                geometry: shirt?.geometry,
                data: {
                  ...work,
                  id: item.workId,
                  ...item.data,
                },
              };
              return workItem;
            });
            acc.push(...temp);
            return acc;
          }, []),
        );

        // Распределяем работы в особом порядке, сначала рыботы рубашек, потом филёнок, после элементов
        // Задумка Даника, посмотрим как это будет работать.
        shirtWorks.forEach((w) => entityQueue.queue.append(w));
        panelWorks.forEach((w) => entityQueue.queue.append(w));
        elementWorks.forEach((w) => entityQueue.queue.append(w));
      }

      // Создаем граф заказа. Метод возвращает собранный граф.
    const graph = this.graphProvider.createOrderGraph();
    this.book.graph = graph;

    const blanks = graph.queue(( node ) => {
      const blank = {
        documentId: 0,
        sectorId: 0,
        
      }

    }) 

    } catch (error) {
      console.log('OrderBlankSystem:', error);
    }
  }

  comparator(A: QueueWork, B: QueueWork) {
    if (Number(A.data.id) === Number(B.data.id)) return 0;
    return 1;
  }

  getWork(workId: number) {
    return this.book.works.find((w) => w.id === workId) || null;
  }
}
