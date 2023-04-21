import { Family, IteratingSystem } from 'yug-entity-component-system';
import { PriceComponent } from '../components/price.component';
import { OrderCreator } from 'src/modules/order-processing/providers/order-creator';
import { RoomManager } from 'src/modules/order-processing/room-manager/room-manager';
import { Room } from 'src/modules/order-processing/room-manager/rooms/room';
import { BookEntity } from 'src/modules/repository/order/entities/book.entity';
import { MYEngine } from '../engine/my-engine';
import { BookState } from 'src/modules/repository/order/entities/book.state';
import { GeometryComponent } from '../components/geometry.component';
import { MYEntity } from '../engine/my-entity';

export class PriceSystem extends IteratingSystem {
  private book: BookEntity;
  private room: Room;
  private orderCreator: OrderCreator;
  private roomManager: RoomManager;
  constructor() {
    super(PriceSystem, Family.all(PriceComponent, GeometryComponent).get());
  }

  // перед обновлением, получаем набор необходимых объектов.
  async startProcessing(): Promise<void> {
    this.book = this.getEngine<MYEngine>().bookEntity;
    this.room = this.getEngine<MYEngine>().room;
    this.roomManager = this.room.roomManager;
    this.orderCreator = this.roomManager.orderCreator;
  }

  // Код запускается перед обновлением, можно использовать для решения об отключении системы и. т. д.
  async beforeUpdate(): Promise<void> {
    const book = this.getEngine<MYEngine>().bookEntity;
    if (book && book.state === BookState.CALCULATION_OF_BLANKS) {
      this.setProcessing(true);
    } else {
      this.setProcessing(false);
    }
  }

  protected async processEntity(
    entity: MYEntity,
    deltaTime: number,
  ): Promise<void> {
    const priceData = entity.getComponent<PriceComponent>(PriceComponent).data;
    const geometryData =
      entity.getComponent<GeometryComponent>(GeometryComponent).data;
    const document = entity.documentEntity;
    const sampleEntity = await entity.elementEntity.sample;

    if (!document.errors) {
      document.errors = {};
    }
    if (!priceData.unit) {
    }

    let value = 0;
    switch (priceData.unit) {
      case 'м²':
        value = geometryData.square;
        break;
      case 'м. куб.':
        value = geometryData.cubature;
        break;
      case 'м.п':
        value = geometryData.linearMeters;
        break;
      case 'п.м.п':
        value = geometryData.perimeter;
        break;
      case 'шт.':
        value = geometryData.amount;
        break;
      default:
        break;
    }
    priceData.value = Number(value.toFixed(3));
    priceData.cost = Number((priceData.price * priceData.value).toFixed(2));

  }
}
