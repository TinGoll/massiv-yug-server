import { Component } from 'yug-entity-component-system';
import { IComponent } from './component-interface';

interface TrimPanelData {}

export class TrimPanelComponent
  extends Component
  implements IComponent<TrimPanelData>
{
  data: TrimPanelData;
  constructor() {
    super(TrimPanelComponent);
  }

  getData(): TrimPanelData {
    return this.data;
  }
}
