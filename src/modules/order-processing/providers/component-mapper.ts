import { Injectable } from '@nestjs/common';
import { Geometry } from 'src/core/common/models/geometry';
import { IComponent } from 'src/core/ecs/components/component-interface';
import { GeometryComponent } from 'src/core/ecs/components/geometry.component';
import { PanelComponent } from 'src/core/ecs/components/panel.component';
import { ProfileComponent } from 'src/core/ecs/components/profile.component';
import { WorkComponent } from 'src/core/ecs/components/work.component';
import { ComponentData } from 'src/modules/repository/order/entities/document.element.entity';
import { ComponentKey } from 'src/modules/repository/order/entities/element.entity';
import { Component, ComponentClass } from 'yug-entity-component-system';

@Injectable()
export class ComponentMapper {
  private readonly map = new Map<ComponentKey, ComponentClass>();
  constructor() {
    this.map.set('component_geometry', GeometryComponent);
    this.map.set('component_works', WorkComponent);
    this.map.set('component_panel', PanelComponent);
    this.map.set('component_profile', ProfileComponent);

    // const test = this.getInstance<GeometryComponent, [Partial<Geometry>]>(
    //   'component_geometry',
    //   {
    //     height: 916,
    //     width: 396,
    //   },
    // );

    // // console.log(this.serialization<GeometryComponent>(test));

    // console.log(this.getKey(WorkComponent));
  }

  /**
   * Получить ключ компонента по {@link ComponentClass}
   * @param componentClass
   * @returns
   */

  getKey(componentClass: ComponentClass): ComponentKey {
    return [...this.map].find((c) => c[1] === componentClass)[0];
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
  getInstance<
    T extends Component | IComponent,
    J extends Array<any> = Array<any>,
  >(key: ComponentKey, ...args: J): T | null {
    const Cmp = this.get(key);
    if (!Cmp) return null;
    const cmp = <T>new Cmp(...args);
    (<IComponent<object>>cmp).key = key;
    return cmp;
  }

  serialization<T extends Component>(
    component: T,
  ): Omit<
    T,
    'name' | '_componentClass' | 'equals' | 'getClass' | 'hashCode' | 'toString'
  > {
    const {
      name,
      _componentClass,
      equals,
      getClass,
      hashCode,
      toString,
      ...serializationObject
    } = component as any;
    return serializationObject;
  }

  changeComponent<T extends object = object>(
    componentKey: ComponentKey,
    components: ComponentData[],
    data: Partial<T>,
  ): ComponentData<T> {
    for (const cmp of components) {
      if (cmp.componentName === componentKey) {
        cmp.data = { ...cmp.data, ...data };
        return cmp;
      }
    }
    return null;
  }
}
