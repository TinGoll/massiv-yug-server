/** Набор полей необходимых для добавления цвета */
export class ColerCreateInput {
  name: string;
  value?: number;
}
/** Набор полей необходимых для обновления цвета */
export class ColerUpdateInput {
  id: number;
  name?: string;
  value?: number;
}
