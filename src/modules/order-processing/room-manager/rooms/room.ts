import { MYEngine } from 'src/core/ecs/engine/my-engine';
import { MYEntity } from 'src/core/ecs/engine/my-entity';
import { GeometrySystem } from 'src/core/ecs/systems/geometry.system';
import { PanelSystem } from 'src/core/ecs/systems/panel.system';
import { ProfileSystem } from 'src/core/ecs/systems/profile.system';
import { BookEntity } from 'src/modules/repository/order/entities/book.entity';
import { Component } from 'yug-entity-component-system';
import { ComponentMapper } from '../../providers/component-mapper';
import { RoomManager } from '../room-manager';

export class Room {
  public readonly id: number | string;
  private engine: MYEngine;
  constructor(
    private readonly roomManager: RoomManager,
    private readonly book: BookEntity,
    private readonly componentMapper: ComponentMapper,
  ) {
    this.id = book.id;
    this.engine = new MYEngine(book);
  }

  async update(dt: number): Promise<void> {
    await this.engine.update(dt);
  }

  /** Вызывается после создания команты. Переопределите, что бы использовать в своих целях. */
  async afterCreation(): Promise<void> {
    // *************************************************
    // Системы
    // Система расчета геометрии
    this.engine.addSystem(new GeometrySystem());
    // Система расчета профиля.
    this.engine.addSystem(new ProfileSystem());
    // Система расчета филёнок.
    this.engine.addSystem(new PanelSystem());

    // *************************************************
    // Сущности

    for (const doc of this.book?.documents || []) {
      for (const elm of doc.elements || []) {
        /** Создаем расширенный объект Сущности. */
        const entity = new MYEntity(elm, doc, this.book);

        for (const cmp of elm.components || []) {
          const component = this.componentMapper.getInstance(
            cmp.componentName,
            cmp.data || {},
          );
          if (component) {
            entity.add(component as Component);
          }
        }
        this.engine.addEntity(entity);
      }
    }
  }
}
