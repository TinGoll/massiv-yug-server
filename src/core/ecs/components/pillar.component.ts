import { Component } from 'yug-entity-component-system';
import { IComponent } from './component-interface';

interface PillarData {}

export class PillarComponent
  extends Component
  implements IComponent<PillarData>
{
  data: PillarData;
  constructor() {
    super(PillarComponent);
  }

  getData(): PillarData {
    return this.data;
  }
}
