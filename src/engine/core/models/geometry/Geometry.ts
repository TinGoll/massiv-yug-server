import { Engine } from "yug-entity-component-system";

export class Geometry {
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
  public points: Array<{ x: number; y: number; z: number }> = [];
  private mm: number = 1000;
  constructor(
    height: number | null = null,
    width: number | null = null,
    depth: number | null = null,
    amount: number | null = null,
  ) {
    this.height = height;
    this.width = width;
    this.depth = depth;
    this.amount = amount;
  }

  getSquare() {
    return ((this.height || 0) / this.mm) * ((this.width || 0) / this.mm);
  }

  getCubature() {
    return (
      ((this.height || 0) / this.mm) *
      ((this.width || 0) / this.mm) *
      ((this.depth || 0) / this.mm)
    );
  }

  getPerimeter() {
    return (
      ((this.height || 0) / this.mm) * 2 + ((this.width || 0) / this.mm) * 2
    );
  }
}
