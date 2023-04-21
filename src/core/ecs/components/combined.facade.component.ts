import { Component } from 'yug-entity-component-system';
import { IComponent } from './component-interface';
import FacadeComponentTypes from './facade.component';
import WorkComponentTypes from './works.component';
import { Geometry } from 'src/core/common/models/geometry';

declare module CombinedFacadeComponentTypes {
  //Тип расчета. До верхней границы профиля, до нижней границы и до середины.
  type CalculationType =
    | 'from top border'
    | 'from bottom border'
    | 'from middle';

  // Расстояние до профиля.
  interface TransverseProfileProps {
    profileDistance?: number;
  }

  /** Балюстрада */
  interface Baluster {
    geometry: Geometry;
    name: string;
    material?: string;
    type: 'Балюстрада';
    index?: number;
  }

  interface CombinedFacadeData {
    splicingAngle?: '45°' | '90°' | null;

    material?: string;

    calculationType: CalculationType;

    panels?: Array<FacadeComponentTypes.Panel | Baluster>;
    shirts?: Array<FacadeComponentTypes.Shirt | null>;

    profiles?: [
      FacadeComponentTypes.Profile,
      FacadeComponentTypes.Profile,
      FacadeComponentTypes.Profile,
      FacadeComponentTypes.Profile,
    ];

    transverseProfile?: Array<
      FacadeComponentTypes.Profile & TransverseProfileProps
    >;

    distances?: number[];

    overlayElements?: Array<FacadeComponentTypes.OverlayElement | null>;

    works?: WorkComponentTypes.Work[];
    /** Тип элемента */
    type: 'Комбинированный фасад';

    balusterSize?: number;
  }
}

export default CombinedFacadeComponentTypes;

export class CombinedFacadeComponent
  extends Component
  implements IComponent<CombinedFacadeComponentTypes.CombinedFacadeData>
{
  data: CombinedFacadeComponentTypes.CombinedFacadeData = {
    type: 'Комбинированный фасад',
    calculationType: 'from top border',
    panels: [],
    distances: Array(20).fill(null),
    balusterSize: 113,
  };
  constructor(data: Partial<CombinedFacadeComponentTypes.CombinedFacadeData>) {
    super(CombinedFacadeComponent);
    this.data = { ...this.data, ...data };
  }

  getData(): CombinedFacadeComponentTypes.CombinedFacadeData {
    return this.data;
  }
}
