import { Injectable } from '@nestjs/common';
import { Component } from 'yug-entity-component-system';
import { ComponentClass } from 'yug-entity-component-system/dist/core/Component';
import { GeometryComponent } from '../components/geometry.component';
import { WorksComponent } from '../components/works.component';

/** Табличные имена/ключи всех компонентов */
const componentKeys = ['component_geometry', 'component_works'] as const;

export type ComponentKey = typeof componentKeys[number];

@Injectable()
export class ComponentMapper {
  private readonly map = new Map<ComponentKey, ComponentClass>();

  constructor() {
    /** Соответствие ключу и классу компонента. */
    this.map.set('component_geometry', GeometryComponent);
    this.map.set('component_works', WorksComponent);
  }

  /**
   * Получить класс компонента по ключу
   * @param key Табличное название компонента
   * @returns Класс
   */
  get<T extends any = ComponentClass>(key: ComponentKey): T | null {
    return <T>this.map.get(key) || null;
  }

  /**
   * Создать объект класса компонента, по ключу. Можно передать аргументы
   * @param key
   * @param args
   * @returns instance Компонента
   */
  getInstance<T extends Component, J extends any = any>(
    key: ComponentKey,
    ...args: J[]
  ): T | null {
    const Cmp = this.get(key);
    if (!Cmp) return null;
    return <T>new Cmp(...args);
  }

  /**
   * Получить DTO по умолчанию, объект данными.
   * @param key Табличное название компонента
   * @param args
   * @returns
   */
  getDefaultDto<T extends any = any, J extends any = any>(
    key: ComponentKey,
    ...args: J[]
  ) {
    const { name, _componentClass, ...dto } = this.getInstance(
      key,
      ...args,
    ) as any;
    return <Pick<T, Exclude<keyof T, keyof Component>>>{
      ...dto,
    };
  }
}
