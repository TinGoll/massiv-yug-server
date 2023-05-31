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
    try {
      const toFixed = 3;
      const gmCmp = entity.getComponent<GeometryComponent>(GeometryComponent);
      const height = Number(gmCmp.data.height || 0);
      const width = Number(gmCmp.data.width || 0);
      const depth = Number(gmCmp.data.depth || 0);
      const amount = Number(gmCmp.data.amount || 0);
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
      gmCmp.data.linearMeters = Number(
        ((height / mm) * amount).toFixed(toFixed),
      );

      if (gmCmp.data.height !== null) {
        gmCmp.data.height = height;
      }
      if (gmCmp.data.width !== null) {
        gmCmp.data.width = width;
      }
      if (gmCmp.data.depth !== null) {
        gmCmp.data.depth = depth;
      }
      if (gmCmp.data.amount !== null) {
        gmCmp.data.amount = amount;
      }
      // console.log(JSON.stringify(gmCmp, null, 2));
    } catch (error) {
      console.log('GeometrySystem', error);
    }
  }
}
