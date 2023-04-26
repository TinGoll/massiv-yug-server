import { Component } from 'yug-entity-component-system';
import { IComponent } from './component-interface';
import { Geometry } from 'src/core/common/models/geometry';
import WorkComponentTypes from './works.component';
import { ComponentKey } from 'src/modules/repository/order/entities/element.entity';

declare module FacadeComponentTypes {
  /** Филёнка фасада */
  interface Panel {
    name?: string;
    type: PanelType;
    material?: string;
    geometry?: Geometry;
    index?: number;
    works?: WorkComponentTypes.Work[];
  }

  /** Профиль фасада */
  interface Profile {
    name: string;
    type: ProfileType;
    material?: string;
    geometry?: Geometry;
    index?: number;
    parallel?: 0 | 1;
    location?: 'left' | 'top' | 'right' | 'bot';
    works?: WorkComponentTypes.Work[];
  }
  /** Рубашка фасада */
  interface Shirt {
    name: string;
    type: ShirtType;
    material?: string;
    geometry?: Geometry;
    index?: number;
    works?: WorkComponentTypes.Work[];
  }
  /** Накладка фасада */
  interface OverlayElement {
    name: string;
    type: OverlayType;
    geometry?: Geometry;
    material?: string;
    index?: number;
    works?: WorkComponentTypes.Work[];
  }
  /** Тип филёнки (имееться ввиду тип панели, может быть решёткой, филёнкой или стеклом.) */
  type PanelType = 'Филёнка' | 'Решётка' | 'Витрина';
  /** Тип Рубашки - накладки на филёнку. Если Тип панели не фелёнка, то этот объект будет null */
  type ShirtType = 'Рубашка';
  /** Наклдной элемент, как правило на стекло */
  type OverlayType = 'Накладной элемент';
  type ProfileType =
    | 'Профиль левый'
    | 'Профиль верхний'
    | 'Профиль правый'
    | 'Профиль нижний'
    | 'Профиль поперечный';

  interface ComponentData {
    /** Филёнка. */
    panel?: Panel | null;
    /** Рубашка филёнки. Если филенка null рубашка автоматически становиться null */
    shirt?: Shirt | null;
    /** Накладка на стекло / филёнку */
    overlayElement?: OverlayElement | null;
    /** Массив профилей. с 0 до 3. 0 - Левый, 1 - верхний, 2 - правый, 3 - нижний. */
    profiles?: [Profile, Profile, Profile, Profile] | null;
    /** Угол сращивания фасада. */
    splicingAngle?: '45°' | '90°' | null;
    /** Массив с работами. */
    panelWorks?: WorkComponentTypes.Work[];
    shirtWorks?: WorkComponentTypes.Work[];
    profileWorks?: WorkComponentTypes.Work[];
    /** Тип элемента */
    type: 'Фасад';
    material?: string | null;
  }
}

export default FacadeComponentTypes;

export class FacadeComponent
  extends Component
  implements IComponent<FacadeComponentTypes.ComponentData>
{
  key: ComponentKey = 'component_facade';
  data: FacadeComponentTypes.ComponentData = {
    splicingAngle: null,
    type: 'Фасад',
  };

  constructor(data: Partial<FacadeComponentTypes.ComponentData> = {}) {
    super(FacadeComponent);
    this.data = { ...this.data, ...data };
  }

  getData(): FacadeComponentTypes.ComponentData {
    return this.data;
  }
}

/** Создание 4 стандартных профилей для фасада */
export function getResetProfile(
  geometry: Partial<Geometry> = {},
  profile: Partial<FacadeComponentTypes.Profile> = {},
): [
  FacadeComponentTypes.Profile,
  FacadeComponentTypes.Profile,
  FacadeComponentTypes.Profile,
  FacadeComponentTypes.Profile,
] {
  return [
    {
      type: 'Профиль левый',
      geometry: Geometry.zeroing(geometry),
      index: 0,
      location: 'left',
      parallel: 0,
      name: '',
      material: '',
      ...profile,
    },
    {
      type: 'Профиль верхний',
      geometry: Geometry.zeroing(geometry),
      index: 1,
      location: 'top',
      parallel: 1,
      name: '',
      material: '',
      ...profile,
    },
    {
      type: 'Профиль правый',
      geometry: Geometry.zeroing(geometry),
      index: 2,
      location: 'right',
      parallel: 0,
      name: '',
      material: '',
      ...profile,
    },
    {
      type: 'Профиль нижний',
      geometry: Geometry.zeroing(geometry),
      index: 3,
      location: 'bot',
      parallel: 1,
      name: '',
      material: '',
      ...profile,
    },
  ];
}
