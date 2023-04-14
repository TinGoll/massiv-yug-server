import { Component } from 'yug-entity-component-system';
import { IComponent } from './component-interface';

interface ProductProfileData {}

export class ProductProfileComponent
  extends Component
  implements IComponent<ProductProfileData>
{
  data: ProductProfileData;
  constructor() {
    super(ProductProfileComponent);
  }

  getData(): ProductProfileData {
    return this.data;
  }
}
