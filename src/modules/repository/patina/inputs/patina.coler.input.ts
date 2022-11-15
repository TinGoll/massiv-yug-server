
/** Набор полей необходимых для добавления цвета */
export class PatinaColerCreateInput {
  name: string;
  value?: number;
}
/** Набор полей необходимых для обновления цвета */
export class PatinaColerUpdateInput {
  id: number;
  name?: string;
  value?: number;
}
