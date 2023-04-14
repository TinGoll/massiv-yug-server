import { Unit } from 'src/core/@types/app.types';

const workKey = [
  'Раскрой',
  'Фрезеровка на большом фрезере',
  'Раскрой шпона',
  'Склейка на мембранном прессе',
  'Шлифовка плоских изделий',
  'Шлифовка на шлифовальных центрах',
  'Подбор профиля',
  'Запил',
  'Мастер Джон',
  'Пятый',
  'Вайма',
] as const;
export type WorkKey = typeof workKey[number];

/** Набор полей необходимых для добавления работы */
export class WorkCreateInput<T extends string = string> {
  name: T;

  price?: number;

  norm?: number;

  unit: Unit;

  salaryUnit?: Unit;

  data?: any;
}
/** Набор полей необходимых для обновления работы */
export class WorkUpdateInput<T extends string = string> {
  id: number;

  name?: T;

  price?: number;

  norm?: number;

  unit?: Unit;

  salaryUnit?: Unit;

  data?: any;
}
