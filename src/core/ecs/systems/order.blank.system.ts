import {
  BaseSystem,
  Family,
  ImmutableArray,
} from 'yug-entity-component-system';
import { MYEntity } from '../engine/my-entity';
import { WorkComponent } from '../components/work.component';
import { GeometryComponent } from '../components/geometry.component';
import { MYEngine } from '../engine/my-engine';
import { BookState } from 'src/modules/repository/order/entities/book.state';
import { BookEntity } from 'src/modules/repository/order/entities/book.entity';
import { OrderCreator } from 'src/modules/order-processing/providers/order-creator';
import { RoomManager } from 'src/modules/order-processing/room-manager/room-manager';
import { Room } from 'src/modules/order-processing/room-manager/rooms/room';
import { QueueCollection } from 'src/core/common/queue-collection/QueueCollection';
import { PanelComponent } from '../components/panel.component';
import SerializationOrderGraph from 'src/core/common/graph/serialization.graph';


export class OrderBlankSystem extends BaseSystem {
  private book: BookEntity;
  private room: Room;
  private orderCreator: OrderCreator;
  private roomManager: RoomManager;

  constructor() {
    super(OrderBlankSystem, Family.all(GeometryComponent, WorkComponent).get());
  }

  async startProcessing(): Promise<void> {
    this.book = this.getEngine<MYEngine>().bookEntity;
    this.room = this.getEngine<MYEngine>().room;
    this.roomManager = this.room.roomManager;
    this.orderCreator = this.roomManager.orderCreator;
  }

  // Код запускается перед обновлением, можно использовать для решения об отключении системы и. т. д. */
  async beforeUpdate(): Promise<void> {
    const book = this.getEngine<MYEngine>().bookEntity;
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
      const entityQueues: SerializationOrderGraph.EntityQueues[] = [];

      if (!this.room.orderGraph || !this.room.orderGraph.isBuilt) {
        return;
      }
      const graph = this.room.orderGraph;

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
        const elementWorks: SerializationOrderGraph.QueueWork[] = []; // Работы элемента.
        const panelWorks: SerializationOrderGraph.QueueWork[] = []; //  Работы вложенных деталей (Филёнка)
        const shirtWorks: SerializationOrderGraph.QueueWork[] = []; //  Работы вложенных деталей (Рубашка филёнки)
        const profileWorks: SerializationOrderGraph.QueueWork[] = []; // Работы вложенных деталей (Профиль)
        // Заполняем массив работ элемента.
        elementWorks.push(
          ...(works.workData || []).map((item) => {
            const work = this.getWork(item.workId) || {};
            const workItem: SerializationOrderGraph.QueueWork = {
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
          ...(panels || []).reduce<SerializationOrderGraph.QueueWork[]>((acc, panel) => {
            const temp = (panel?.workData || []).map((item) => {
              const work = this.getWork(item.workId) || {};
              const workItem: SerializationOrderGraph.QueueWork = {
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
          ...(panels || []).reduce<SerializationOrderGraph.QueueWork[]>((acc, panel) => {
            const shirt = panel.shirt;
            if (!shirt) {
              return acc;
            }
            const temp = (shirt?.workData || []).map((item) => {
              const work = this.getWork(item.workId) || {};
              const workItem: SerializationOrderGraph.QueueWork = {
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

      const blanks = graph.queue((node) => {
        const blank: SerializationOrderGraph.QueueBlank = {
          name: node.options.name,
          nodeId: node.id,
          sectorId: node.options.sectorid,
          fields: node.options.fields,
          queueDocuments: [],
        };
        blank.queueDocuments =
          this.book.documents?.map((document) => {
            const {
              book,
              cost,
              createdAt,
              deleted,
              elements,
              resultData,
              updatedAt,
              ...opt
            } = document;
            let queueDocument: SerializationOrderGraph.QueueDocument = {
              id: document.id,
              queueList: [],
            };
            if (!blank.fields) {
              queueDocument = { ...queueDocument, ...opt };
            } else {
              for (const key in opt) {
                if (opt[key]) {
                  queueDocument[key] = opt[key];
                }
              }
            }
            return queueDocument;
          }) || [];
        for (const { workId } of node.options.workData) {
          for (const entityQueue of entityQueues) {
            const documentEntityId = entityQueue.entity.documentEntity.id;
            const queueDocument = blank.queueDocuments.find(
              (d) => d.id === documentEntityId,
            );
            if (node.options.takeOne) {
              const qws = entityQueue.queue.findAndTake(
                (value) => value.data.id === workId,
              );
              if (qws) {
                queueDocument.queueList.push(qws);
              }
            } else {
              let next_qws = true;
              while (next_qws) {
                next_qws = false;
                const qws = entityQueue.queue.findAndTake(
                  (value) => value.data.id === workId,
                );
                if (qws) {
                  queueDocument.queueList.push(qws);
                  next_qws = true;
                }
              }
            }
          }
        }

        return blank;
      });

      graph.blanks = blanks;

      
      this.book.graph = graph.serialization();
    } catch (error) {
      console.log('OrderBlankSystem:', error);
    }
  }

  
  comparator(A: SerializationOrderGraph.QueueWork, B: SerializationOrderGraph.QueueWork) {
    if (Number(A.data.id) === Number(B.data.id)) return 0;
    return 1;
  }

  getWork(workId: number) {
    return this.book.works.find((w) => w.id === workId) || null;
  }
}
