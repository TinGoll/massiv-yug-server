import { Component } from 'yug-entity-component-system';
import { IComponent } from './component-interface';

interface PlinthData {}

export class PlinthComponent
  extends Component
  implements IComponent<PlinthData>
{
  data: PlinthData;
  constructor() {
    super(PlinthComponent);
  }

  getData(): PlinthData {
    return this.data;
  }
}
