import { PatinaType } from 'src/core/@types/app.types';

/** Набор полей необходимых для добавления цвета */
export class PatinaCreateInput {
  name: string;
  type: PatinaType;
}
/** Набор полей необходимых для обновления цвета */
export class PatinaUpdateInput {
  id: number;
  name?: string;
  type?: PatinaType;
}
