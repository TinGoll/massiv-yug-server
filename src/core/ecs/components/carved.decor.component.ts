import { Component } from 'yug-entity-component-system';
import { IComponent } from './component-interface';

interface CarvedDecorData {}

export class CarvedDecorComponent
  extends Component
  implements IComponent<CarvedDecorData>
{
  data: CarvedDecorData;
  constructor() {
    super(CarvedDecorComponent);
  }

  getData(): CarvedDecorData {
    return this.data;
  }
}
