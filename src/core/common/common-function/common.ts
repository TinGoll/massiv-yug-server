import { Unit } from 'src/core/@types/app.types';
import { Geometry } from '../models/geometry';

export class Common {
  /**
   * Функция, для определения 'веса', значения которое соответствует еденице измерения.
   * @param unit {@link Unit}
   * @param geometry {@link Geometry}
   * @returns
   */
  public static getWeight(unit: Unit, geometry: Geometry): number {
    switch (unit) {
      case 'м²':
        return geometry?.square || 0;
      case 'м.п':
        return geometry?.linearMeters || 0;
      case 'м. куб.':
        return geometry?.cubature || 0;
      case 'п.м.п':
        return geometry?.perimeter || 0;
      case 'шт.':
        return geometry?.amount || 0;
      default:
        return 0;
    }
  }
}
