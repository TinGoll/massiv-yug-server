import { Component } from 'yug-entity-component-system';
import { IComponent } from './component-interface';

interface LightBarData {}

export class LightBarComponent
  extends Component
  implements IComponent<LightBarData>
{
  data: LightBarData;
  constructor() {
    super(LightBarComponent);
  }

  getData(): LightBarData {
    return this.data;
  }
}
