
/** Набор полей необходимых для добавления конвертера */
export class PatinaConverterCreateInput {
  name: string;
  value: number;
}
/** Набор полей необходимых для обновления конвертера */
export class PatinaConverterUpdateInput {
  id: number;
  name?: string;
  value?: number;
}
