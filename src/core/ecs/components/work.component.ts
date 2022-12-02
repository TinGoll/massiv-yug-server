import { WorkComponentData } from 'src/core/@types/app.types';
import { Component } from 'yug-entity-component-system';
import { IComponent } from './component-interface';

export class WorkComponent
  extends Component
  implements IComponent<WorkComponentData[]>
{
  data: WorkComponentData[] = [];
  constructor(data: WorkComponentData[] = []) {
    super(WorkComponent);
    this.data = data;
  }
  getData(): WorkComponentData[] {
    return this.data;
  }
}
