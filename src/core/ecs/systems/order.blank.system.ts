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

export class OrderBlankSystem extends BaseSystem {
  constructor() {
    super(OrderBlankSystem, Family.all(GeometryComponent, WorkComponent).get());
  }

  /** Код запускается перед обновлением, можно использовать для решения об отключении системы и. т. д. */
  //   async beforeUpdate(): Promise<void> {
  //     const book = this.getEngine<MYEngine>().bookEntity;
  //     console.log("book.state", book.state);

  //     if (book && book.state === BookState.CALCULATION_OF_BLANKS) {
  //       this.setProcessing(true);
  //     } else {
  //       this.setProcessing(false);
  //     }
  //   }

  protected async processEntities(
    entities: ImmutableArray<MYEntity>,
    deltaTime: number,
  ): Promise<void> {
    // console.log(entities);
    try {
    } catch (error) {
      console.log("OrderBlankSystem:", error);
    }
  }
}
