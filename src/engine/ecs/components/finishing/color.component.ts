import { Color } from 'src/engine/core/models/color/Color';
import { Component } from 'yug-entity-component-system';

export class ColorComponent extends Component {
  public color: Color | null = null
  constructor() {
    super(ColorComponent);
  }
}
