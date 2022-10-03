

/** Ксласс Coler */
export class ColorColer {
    id: number;
    converterId: number;
    name: string;
    value: number;
}

/** Объект для создания класса Coler */
export class ColorColerCreateInput {
  converterId: number;
  name: string;
  value: number;
}

/** Объект для тзменения класса Coler */
export class ColorColerUpdateInput {
  converterId?: number;
  name?: string;
  value?: number;
}