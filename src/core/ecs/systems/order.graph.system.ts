import {
  BaseSystem,
  Engine,
  Entity,
  Family,
  ImmutableArray,
} from 'yug-entity-component-system';
import { MYEngine } from '../engine/my-engine';

export class OrderGraphSystem extends BaseSystem {
  constructor() {
    super(OrderGraphSystem, Family.one().get());
  }

  /** Переопределяем движок, на расширенный */
  getEngine<T extends Engine = MYEngine>(): T | null {
    return super.getEngine<T>();
  }

  protected async processEntities(
    entities: ImmutableArray<Entity>,
    deltaTime: number,
  ): Promise<void> {}
}
