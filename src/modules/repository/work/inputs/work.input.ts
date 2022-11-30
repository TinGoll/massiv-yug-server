import { Unit } from 'src/core/@types/app.types';

/** Набор полей необходимых для добавления работы */
export class WorkCreateInput {
  name: string;

  price?: number;

  norm?: number;

  unit: Unit;
  
  salaryUnit?: Unit;

  data?: any;
}
/** Набор полей необходимых для обновления работы */
export class WorkUpdateInput {
  id: number;

  name?: string;

  price?: number;

  norm?: number;

  unit?: Unit;

  salaryUnit?: Unit;

  data?: any;
}
