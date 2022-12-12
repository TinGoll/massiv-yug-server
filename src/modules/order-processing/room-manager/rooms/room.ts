import { MYEngine } from 'src/core/ecs/engine/my-engine';
import { MYEntity } from 'src/core/ecs/engine/my-entity';
import { GeometrySystem } from 'src/core/ecs/systems/geometry.system';
import { NestedWorkSystem } from 'src/core/ecs/systems/nested.works.system';
import { OrderGraphSystem } from 'src/core/ecs/systems/order.graph.system';
import { PanelSystem } from 'src/core/ecs/systems/panel.system';
import { PresentationSystem } from 'src/core/ecs/systems/presentation.system';
import { ProfileSystem } from 'src/core/ecs/systems/profile.system';
import { ResultSystem } from 'src/core/ecs/systems/result.system';
import { WorkSystem } from 'src/core/ecs/systems/work.system';
import { BookEntity } from 'src/modules/repository/order/entities/book.entity';
import { Component } from 'yug-entity-component-system';
import { ComponentMapper } from '../../providers/component-mapper';
import { RoomManager } from '../room-manager';

export class Room {
  public readonly id: number | string;
  private engine: MYEngine;
  constructor(
    public readonly roomManager: RoomManager,
    public readonly book: BookEntity,
    public readonly componentMapper: ComponentMapper,
  ) {
    this.id = book.id;
    this.engine = new MYEngine(book, this);
  }

  async update(dt: number): Promise<void> {
    await this.engine.update(dt);
    this.roomManager.stop();
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
    // Результаты.
    this.engine.addSystem(new ResultSystem());
    // Расчет работ для элементов заказа.
    this.engine.addSystem(new WorkSystem());
    // расчет работ для вложенных элементов.
    this.engine.addSystem(new NestedWorkSystem());
    // Создание графа заказа
    this.engine.addSystem(new OrderGraphSystem());
    // Система представления и отправки состояния книги
    this.engine.addSystem(new PresentationSystem());

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
