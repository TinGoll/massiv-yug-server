import { MaterialType } from 'src/core/@types/app.types';

/** Набор полей необходимых для добавления цвета */
export class MaterialCreateInput {
  name: string;
  type: MaterialType;
}
/** Набор полей необходимых для обновления цвета */
export class MaterialUpdateInput {
  id: number;
  name?: string;
  type?: MaterialType;
}
