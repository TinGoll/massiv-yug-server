import {
  Engine,
  Entity,
  Family,
  IteratingSystem,
} from 'yug-entity-component-system';
import { GeometryComponent } from '../components/geometry.component';
import { MYEngine } from '../engine/my-engine';

export class GeometrySystem extends IteratingSystem {
  constructor() {
    super(GeometrySystem, Family.one(GeometryComponent).get());
  }

  /** Переопределяем движок, на расширенный */
  getEngine<T extends Engine = MYEngine>(): T | null {
    return super.getEngine<T>();
  }

  /** Код запускается перед обновлением, модно использовать для решения об отключении системы и. т. д. */
  async beforeUpdate(): Promise<void> {
    this.setProcessing(true);
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
