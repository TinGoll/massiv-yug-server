import { Geometry } from '../geometry/Geometry';

export class Panel {
  public geometry: Geometry = new Geometry();
  shirt: Shirt | null = null;
  
  constructor() {}

  createShirt() {
    this.shirt = new Shirt();
  }
  removeShirt() {
    this.shirt = null;
  }
}

export class Shirt {
  public geometry: Geometry = new Geometry();
  veneer: string;
  constructor() {}
}
