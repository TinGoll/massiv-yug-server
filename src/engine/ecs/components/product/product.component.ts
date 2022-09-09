import { Component } from 'yug-entity-component-system';

type ProductGroupProbs = "Фасады"

export class ProductComponent extends Component {
  group: ProductGroupProbs;
  constructor() {
    super(ProductComponent);
  }
}
