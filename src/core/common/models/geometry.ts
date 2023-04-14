// Класс описывающий парарметры геометрических фигур.

export class Geometry {
  height?: number | null;
  width?: number | null;
  depth?: number | null;
  amount?: number | null;
  square: number = 0;
  cubature: number = 0;
  perimeter: number = 0;
  linearMeters: number = 0;

  /** Обнуленный объект геометрии */
  public static zeroing(defaultData: Partial<Geometry> = {}): Geometry {
    return {
      height: 0,
      width: 0,
      depth: 0,
      amount: 0,
      square: 0,
      cubature: 0,
      perimeter: 0,
      linearMeters: 0,
      ...defaultData,
    };
  }
  /** Стандартный расчет параметров геометрии. МУТИРУЕТ ОБЪЕКТ */
  public static calculate(geometry: Geometry, mm: number = 1000): Geometry {
    if (!geometry) {
      return null;
    }
    const fixed = 3;
    const amount = Number(geometry.amount || 0);
    const height = Number(geometry.height || 0);
    const width = Number(geometry.width || 0);
    const depth = Number(geometry.depth || 0);
    geometry.linearMeters = Number(((height / mm) * amount).toFixed(fixed));
    geometry.cubature = Number(
      ((height / mm) * (width / mm) * (depth / mm) * amount).toFixed(fixed),
    );
    geometry.square = Number(
      ((height / mm) * (width / mm) * amount).toFixed(fixed),
    );
    geometry.perimeter = Number(
      ((height / mm) * 2 + (width / mm) * 2).toFixed(fixed),
    );

    geometry.height = geometry.height === null ? null : height;
    geometry.width = geometry.width === null ? null : width;
    geometry.depth = geometry.depth === null ? null : depth;
    geometry.amount = geometry.amount === null ? null : amount;

    return geometry;
  }
}
