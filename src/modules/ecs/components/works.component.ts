import { Component } from 'yug-entity-component-system';

interface WorkData {
  workId: number;
  data: {
    price: number;
    cost: number;
    amount: number;
    norm: number;
  };
}

export class WorksComponent extends Component {
    
  workData: WorkData[];

  constructor() {
    super(WorksComponent);
  }
}
