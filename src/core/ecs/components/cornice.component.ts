import { Component } from 'yug-entity-component-system';
import { IComponent } from './component-interface';

interface CorniceData {}

export class CorniceComponent extends Component implements IComponent<CorniceData> {
  data: CorniceData;
  constructor() {
    super(CorniceComponent);
  }

  getData(): CorniceData {
    return this.data;
  }
}
