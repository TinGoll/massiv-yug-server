import { Component } from 'yug-entity-component-system';
import { IComponent } from './component-interface';

interface ColumnData {}

export class ColumnComponent extends Component implements IComponent<ColumnData> {
  data: ColumnData;
  constructor() {
    super(ColumnComponent);
  }

  getData(): ColumnData {
    return this.data;
  }
}
