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
import SerializationOrderGraph from 'src/core/common/graph/serialization.graph';
import { PanelComponent } from '../components/panel.component';


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
      

      for (const entity of entities) {
        const element = entity.elementEntity;
        const panelData = entity.getComponent<PanelComponent>(PanelComponent)?.data;
        for (const panel of panelData.panels) {
          
        }
      }


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
