import { PanelData } from 'src/core/@types/app.types';
import { Component } from 'yug-entity-component-system';
import { IComponent } from './component-interface';

export class PanelComponent
  extends Component
  implements IComponent<PanelData>
{
  public data: PanelData;
  constructor() {
    super(PanelComponent);
  }
  getData() {
    return this.data;
  }
}
