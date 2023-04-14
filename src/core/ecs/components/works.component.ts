import { Component } from 'yug-entity-component-system';
import { IComponent } from './component-interface';
import { Unit } from 'src/core/@types/app.types';

declare module WorkComponentTypes {
  interface Work<T extends string = string> {
    workId?: number;
    value?: number;
    price?: number;
    cost?: number;
    name: T;
    unit?: Unit;
    salaryUnit?: Unit;
  }

  interface WorkComponentData<T extends string = string> {
    works: Work<T>[];
  }
}

export default WorkComponentTypes;

export class WorksComponent
  extends Component
  implements IComponent<WorkComponentTypes.WorkComponentData>
{
  data: WorkComponentTypes.WorkComponentData = { works: [] };
  constructor(data: Partial<WorkComponentTypes.WorkComponentData> = {}) {
    super(WorksComponent);
    this.data = { ...this.data, ...data };
  }

  getData() {
    return this.data;
  }
}
