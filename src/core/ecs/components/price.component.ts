import { Component } from 'yug-entity-component-system';
import { IComponent } from './component-interface';
import { Unit } from 'src/core/@types/app.types';

declare module PriceComponentTypes {
  interface PriceComponentData {
    price: number;
    unit?: Unit;
    value?: number;
    cost?: number;
    modifer?: string;
    priceElement?: string;
  }
}

export default PriceComponentTypes;

export class PriceComponent
  extends Component
  implements IComponent<PriceComponentTypes.PriceComponentData>
{
  data: PriceComponentTypes.PriceComponentData = { price: 0 };

  constructor(data: Partial<PriceComponentTypes.PriceComponentData>) {
    super(PriceComponent);
    this.data = { ...this.data, ...data };
  }

  getData(): PriceComponentTypes.PriceComponentData {
    return this.data;
  }
}
