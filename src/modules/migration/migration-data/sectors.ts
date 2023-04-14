import { DocumentEntity } from 'src/modules/repository/order/entities/document.entity';
import { Blank } from 'src/modules/repository/sector/entities/sector.entity';
import { WorkKey } from 'src/modules/repository/work/inputs/work.input';

interface Sector {
  name: string;
  orderBy: number;
  sectorLoad: number;
  blanks: Blank[];
  works: Array<WorkKey>;
}

export const migrationSectors: Sector[] = [
  {
    name: 'Шлифовка',
    orderBy: 11,
    sectorLoad: 50,
    works: ['Шлифовка плоских изделий', 'Шлифовка на шлифовальных центрах'],
    blanks: [
      {
        indices: [3],
        header: {
          material: {
            name: true,
          },
        },
      },
      {
        indices: [2],
        header: {
          material: {
            name: true,
          },
        },
      },
      {
        indices: [1],
        header: {
          material: {
            name: true,
          },
        },
      },
    ],
  },
  {
    name: 'Сборка',
    orderBy: 4,
    sectorLoad: 50,
    works: ['Подбор профиля', 'Вайма', 'Запил', 'Мастер Джон'],
    blanks: [
      {
        indices: [1],
        header: {
          color: true,
          material: { name: true },
          panel: true,
          profile: true,
        },
      },
    ],
  },
  {
    name: 'ЧПУ',
    orderBy: 5,
    sectorLoad: 50,
    works: [],
    blanks: [{ indices: [1], header: {} }],
  },
  {
    name: 'Отделка (первый этап)',
    orderBy: 12,
    sectorLoad: 50,
    works: [],
    blanks: [{ indices: [1], header: {} }],
  },
  {
    name: 'Упаковка',
    orderBy: 16,
    sectorLoad: 50,
    works: [],
    blanks: [{ indices: [1], header: {} }],
  },
  {
    name: 'Колеровка',
    orderBy: 6,
    sectorLoad: 50,
    works: [],
    blanks: [{ indices: [1], header: {} }],
  },
  {
    name: 'Раскрой Шпона',
    orderBy: 1,
    sectorLoad: 50,
    works: [],
    blanks: [{ indices: [1], header: {} }],
  },
  {
    name: 'Раскрой МДФ',
    orderBy: 2,
    sectorLoad: 50,
    works: [],
    blanks: [{ indices: [1], header: {} }],
  },
  {
    name: 'Лакировка №2',
    orderBy: 12,
    sectorLoad: 50,
    works: [],
    blanks: [{ indices: [1], header: {} }],
  },
  {
    name: 'Лакировка №3',
    orderBy: 12,
    sectorLoad: 50,
    works: [],
    blanks: [{ indices: [1], header: {} }],
  },
  {
    name: 'Шлифовка Патины',
    orderBy: 13,
    sectorLoad: 50,
    works: [],
    blanks: [{ indices: [1], header: {} }],
  },
  {
    name: 'Лак',
    orderBy: 14,
    sectorLoad: 50,
    works: [],
    blanks: [{ indices: [1], header: {} }],
  },
  {
    name: 'Офис',
    orderBy: 0,
    sectorLoad: 50,
    works: [],
    blanks: [{ indices: [1], header: {} }],
  },
  {
    name: 'Гость',
    orderBy: 0,
    sectorLoad: 50,
    works: [],
    blanks: [{ indices: [1], header: {} }],
  },
  {
    name: 'Изготовление заготовки',
    orderBy: 7,
    sectorLoad: 50,
    works: [],
    blanks: [{ indices: [], header: {} }],
  },
  {
    name: 'Изготовление лестниц',
    orderBy: 22,
    sectorLoad: 50,
    works: [],
    blanks: [{ indices: [], header: {} }],
  },
  {
    name: 'Сборка сложных',
    orderBy: 8,
    sectorLoad: 50,
    works: [],
    blanks: [{ indices: [], header: {} }],
  },
  {
    name: 'Сборка мебели',
    orderBy: 15,
    sectorLoad: 50,
    works: [],
    blanks: [{ indices: [], header: {} }],
  },
  {
    name: 'Приклейка шпона',
    orderBy: 3,
    sectorLoad: 50,
    works: [],
    blanks: [{ indices: [], header: {} }],
  },
  {
    name: 'Склад декора',
    orderBy: 9,
    sectorLoad: 50,
    works: [],
    blanks: [{ indices: [], header: {} }],
  },
  {
    name: 'Шлифовка Станок',
    orderBy: 11,
    sectorLoad: 50,
    works: [],
    blanks: [{ indices: [], header: {} }],
  },
  {
    name: 'Склад упакованных заказов',
    orderBy: 20,
    sectorLoad: 50,
    works: [],
    blanks: [{ indices: [], header: {} }],
  },
  {
    name: 'Отгрузка',
    orderBy: 21,
    sectorLoad: 50,
    works: [],
    blanks: [{ indices: [], header: {} }],
  },
  {
    name: 'Шлифовка филёнок',
    orderBy: 12,
    sectorLoad: 50,
    works: [],
    blanks: [{ indices: [], header: {} }],
  },
  {
    name: 'Шлифовка Нижний Цех',
    orderBy: 11,
    sectorLoad: 50,
    works: [],
    blanks: [{ indices: [], header: {} }],
  },
];
