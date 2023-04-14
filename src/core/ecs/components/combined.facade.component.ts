import { Component } from 'yug-entity-component-system';
import { IComponent } from './component-interface';
import FacadeComponentTypes from './facade.component';
import WorkComponentTypes from './works.component';
import { Geometry } from 'src/core/common/models/geometry';

declare module CombinedFacadeComponentTypes {
  interface Baluster {
    geometry: Geometry;
    name: string;
    type: 'Балюстрада';
  }

  interface CombinedFacadeData {
    panels?: Array<FacadeComponentTypes.Panel | Baluster>;
    profiles?: [
      FacadeComponentTypes.Profile,
      FacadeComponentTypes.Profile,
      FacadeComponentTypes.Profile,
      FacadeComponentTypes.Profile,
    ];
    transverseProfile?: Array<FacadeComponentTypes.Profile>;
    overlayElements?: Array<FacadeComponentTypes.OverlayElement | null>;
    works?: WorkComponentTypes.Work[];
    /** Тип элемента */
    type: 'Комбинированный фасад';
  }
}

export default CombinedFacadeComponentTypes;

export class CombinedFacadeComponent
  extends Component
  implements IComponent<CombinedFacadeComponentTypes.CombinedFacadeData>
{
  data: CombinedFacadeComponentTypes.CombinedFacadeData = {
    type: 'Комбинированный фасад',
  };
  constructor(data: Partial<CombinedFacadeComponentTypes.CombinedFacadeData>) {
    super(CombinedFacadeComponent);
    this.data = { ...this.data, ...data };
  }

  getData(): CombinedFacadeComponentTypes.CombinedFacadeData {
    return this.data;
  }
}
