import { DocumentEntity } from '../repository/order/entities/document.entity';

declare module PriceTypes {
  interface Root {
    elements: Element[];
  }
  interface Element {
    identifier: string;
    document: PriceTypes.OrderDocument;
    element: PriceTypes.OrderElement;
    basePrice: number;
  }

  interface Modifer {
    modiferOperator: Operator;
    modiverValue: (string | number) | Array<string | number>;
    modifer: number;
  }

  type Fields<T, R extends Modifer | Modifer[] = Modifer | Modifer[]> = {
    [K in keyof T]?: (T[K] extends object ? PriceTypes.Fields<T[K]> : R) | R;
  };

  type Operator = 'multiplication' | 'division' | 'addition' | 'subtraction';
  type OrderDocument = PriceTypes.Fields<
    DocumentEntity,
    PriceTypes.Modifer | Modifer[]
  >;

  interface OrderElement {}
}

export { PriceTypes };

let test: PriceTypes.Root = {
  elements: [
    {
      identifier: 'Фасад',
      basePrice: 8000,
      document: {
        color: {
          sample: {
            name: {
              modiverValue: 'Красный',
              modiferOperator: 'multiplication',
              modifer: 1.3,
            },
          },
        },
        material: {
          type: {
            modiverValue: 'Твердый',
            modiferOperator: 'multiplication',
            modifer: 1.2,
          },
        },
        profile: {
          sample: {
            group: {
              modiverValue: ['Ящичный', 'Узкие'],
              modiferOperator: 'multiplication',
              modifer: 1,
            },
          },
        },
      },

      element: {},
    },
  ],
};
