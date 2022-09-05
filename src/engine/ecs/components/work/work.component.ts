import { Work } from 'src/engine/core/models/work/Work';
import { Component } from 'yug-entity-component-system';

export class WorkComponent extends Component {
  public works: Work[] = [];
  public cost: number = 0;
  constructor() {
    super(WorkComponent);
  }
}
