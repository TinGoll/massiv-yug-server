import { Component } from 'yug-entity-component-system';
import { IComponent } from './component-interface';

interface CMZData {}

export class CMZComponent
  extends Component
  implements IComponent<CMZData>
{
  data: CMZData;
  constructor() {
    super(CMZComponent);
  }

  getData(): CMZData {
    return this.data;
  }
}
