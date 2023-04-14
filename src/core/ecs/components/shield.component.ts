import { Component } from 'yug-entity-component-system';
import { IComponent } from './component-interface';

interface ShieldData {}

export class ShieldComponent
  extends Component
  implements IComponent<ShieldData>
{
  data: ShieldData;
  constructor() {
    super(ShieldComponent);
  }

  getData(): ShieldData {
    return this.data;
  }
}
