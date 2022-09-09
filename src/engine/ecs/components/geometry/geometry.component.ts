import { Geometry } from 'src/engine/core/models/geometry/Geometry';
import { Component } from 'yug-entity-component-system';

export class GeometryComponent extends Component {
  geometry: Geometry;
  constructor(
    height: number | null = null,
    width: number | null = null,
    depth: number | null = null,
    amount: number | null = null,
  ) {
    super(GeometryComponent);
    this.geometry = new Geometry(height, width, depth, amount);
  }
}
