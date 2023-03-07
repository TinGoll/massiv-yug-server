import { Entity, Family, IteratingSystem } from 'yug-entity-component-system';
import { GeometryComponent } from '../components/geometry.component';
import { MYEngine } from '../engine/my-engine';
import { BookState } from 'src/modules/repository/order/entities/book.state';

/**
 * Система для расчета геометрических показателей.
 */
export class GeometrySystem extends IteratingSystem {
  constructor() {
    super(GeometrySystem, Family.one(GeometryComponent).get());
  }

  /** Переопределяем движок, на расширенный */
  getMYEngine(): MYEngine {
    return super.getEngine<MYEngine>();
  }

  /** Код запускается перед обновлением, можно использовать для решения об отключении системы и. т. д. */
  async beforeUpdate(): Promise<void> {
    const book = this.getMYEngine().bookEntity;
    console.log(book.state);
    if (book && book.state === BookState.EDITING) {
      this.setProcessing(true);
    } else {
      this.setProcessing(false);
    }
  }

  protected async processEntity(
    entity: Entity,
    deltaTime: number,
  ): Promise<void> {
    const toFixed = 4;
    const gmCmp = entity.getComponent<GeometryComponent>(GeometryComponent);
    const height = gmCmp.data.height || 0;
    const width = gmCmp.data.width || 0;
    const depth = gmCmp.data.depth || 0;
    const amount = gmCmp.data.amount || 0;
    const mm = gmCmp.mm;

    gmCmp.data.square = Number(
      ((height / mm) * (width / mm) * amount).toFixed(toFixed),
    );
    gmCmp.data.cubature = Number(
      ((height / mm) * (width / mm) * (depth / mm) * amount).toFixed(toFixed),
    );
    gmCmp.data.perimeter = Number(
      (((height / mm) * 2 + (width / mm) * 2) * amount).toFixed(toFixed),
    );
    gmCmp.data.linearMeters = Number(((height / mm) * amount).toFixed(toFixed));
    // console.log(JSON.stringify(gmCmp, null, 2));
  }
}
