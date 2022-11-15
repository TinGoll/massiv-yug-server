import { ColorType } from 'src/core/@types/app.types';
/** Набор полей необходимых для добавления цвета */
export class ColorCreateInput {
  name: string;
  colorType: ColorType;
}
/** Набор полей необходимых для обновления цвета */
export class ColorUpdateInput {
  id: number;
  name?: string;
  colorType?: ColorType;
}
