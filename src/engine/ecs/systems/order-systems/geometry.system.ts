import { Entity, Family, IteratingSystem } from 'yug-entity-component-system';
import { GeometryComponent } from '../../components/geometry/geometry.component';

export class GeometrySystem extends IteratingSystem {
  constructor() {
    super(GeometrySystem, Family.all(GeometryComponent).get());
  }

  processEntity(entity: Entity, deltaTime: number): void {
    
    const allEntities = this.getEntities();

    const geoCmp = entity.getComponent<GeometryComponent>(GeometryComponent);
    geoCmp.geometry.square = geoCmp.geometry.getSquare();
    geoCmp.geometry.cubature = geoCmp.geometry.getCubature();
    geoCmp.geometry.perimeter = geoCmp.geometry.getPerimeter();

  }

  startProcessing() {
 
  }

  endProcessing() {
  }
}
