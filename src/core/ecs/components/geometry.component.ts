import { Geometry } from 'src/core/common/models/geometry';
import { Component } from 'yug-entity-component-system';
import { IComponent } from './component-interface';

export class GeometryComponent
  extends Component
  implements IComponent<Geometry>
{
  data: Geometry = {
    square: 0,
    cubature: 0,
    perimeter: 0,
    linearMeters: 0,
  };

  public mm = 1000;
  constructor(data: Partial<Geometry>) {
    super(GeometryComponent);
    this.data = { ...this.data, ...data };
  }

  getData(): Geometry {
    return this.data;
  }
}
