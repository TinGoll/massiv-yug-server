import { Component } from 'yug-entity-component-system';
import { IComponent } from './component-interface';

interface KoromysloData {}

export class KoromysloComponent
  extends Component
  implements IComponent<KoromysloData>
{
  data: KoromysloData;
  constructor() {
    super(KoromysloComponent);
  }

  getData(): KoromysloData {
    return this.data;
  }
}
