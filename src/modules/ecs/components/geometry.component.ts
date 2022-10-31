import { Component } from "yug-entity-component-system";

export class GeometryComponent extends Component {

  public height: number | null = null;
  public width: number | null = null;
  public depth: number | null = null;
  public amount: number | null = null;
  public x: number | null = null;
  public y: number | null = null;
  public z: number | null = null;
  public square: number = 0;
  public cubature: number = 0;
  public perimeter: number = 0;
  public points: Array<{ x?: number; y?: number; z?: number }> = [];
  public mm: number = 1000;
  
  constructor() {
    super(GeometryComponent);
  }

}