

/**
 * id: number;

  name?: string;

  price?: number;

  norm?: number;

  unit?: Unit;

  salaryUnit?: Unit;

  data?: any;
 */

import { WorkCreateInput } from "src/modules/repository/work/inputs/work.input";

export const works: Array<WorkCreateInput> = [
  {
    name: 'Раскрой',
    price: 6,
    norm: 0,
    unit: 'п.м.п',
    salaryUnit: 'п.м.п',
    data: {},
  },
  {
    name: 'Фрезеровка на большом фрезере',
    price: 6,
    norm: 0,
    unit: 'п.м.п',
    salaryUnit: 'п.м.п',
    data: {},
  },
  {
    name: 'Раскрой шпона',
    price: 100,
    norm: 0,
    unit: 'м²',
    salaryUnit: 'м²',
    data: {},
  },
  {
    name: '',
    price: 0,
    norm: 0,
    unit: 'м²',
    salaryUnit: 'м²',
    data: {},
  },
  {
    name: 'Склейка на мембранном прессе',
    price: 100,
    norm: 0,
    unit: 'м²',
    salaryUnit: 'м²',
    data: {},
  },
  {
    name: 'Шлифовка плоских изделий',
    price: 150,
    norm: 0,
    unit: 'м²',
    salaryUnit: 'м²',
    data: {},
  },
  {
    name: 'Шлифовка на шлифовальных центрах',
    price: 150,
    norm: 0,
    unit: 'м²',
    salaryUnit: 'м²',
    data: {},
  },
  {
    name: 'Подбор профиля',
    price: 40,
    norm: 0,
    unit: 'м²',
    salaryUnit: 'м²',
    data: {},
  },
  {
    name: 'Запил',
    price: 60,
    norm: 0,
    unit: 'м²',
    salaryUnit: 'м²',
    data: {},
  },
  {
    name: 'Мастер Джон',
    price: 60,
    norm: 0,
    unit: 'м²',
    salaryUnit: 'м²',
    data: {},
  },
  {
    name: 'Пятый',
    price: 60,
    norm: 0,
    unit: 'м²',
    salaryUnit: 'м²',
    data: {},
  },
  {
    name: 'Вайма',
    price: 65,
    norm: 0,
    unit: 'м²',
    salaryUnit: 'м²',
    data: {},
  },
];