import { Color } from 'src/engine/core/models/color/Color';
import { Component } from 'yug-entity-component-system';

export class FinishingComponent extends Component {
  public color: Color | null = null;
  public varnish: null | null = null;
  public patina: null | null = null;
  constructor() {
    super(FinishingComponent);
  }
}
