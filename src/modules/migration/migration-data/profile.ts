export class ProfileCreateInput {
  name: string;

  angle: '90°' | '45°';
  /** Толщина профиля */
  depth: number;
  /** Толщина паза */
  grooveThickness: number;
  /** Глубина паза */
  grooveDepth: number;
  /** Размер фаски */
  chamferSize: number;
  /** Размер шипа */
  tenonSize: number;
  /** Толщина нижней полки */
  bottomShelfThickness: number;
  /** Проверить работу массива */
  widths: number[];

  drawing?: string;
}

export const migrationProfiles: ProfileCreateInput[] = [
  {
    name: 'Алиери',
    widths: [89],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.8,
    depth: 21.5,
  },
  {
    name: 'Алиери 69',
    widths: [68],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.8,
    depth: 21,
  },
  {
    name: 'Алиери Ящичный',
    widths: [50],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.2,
    depth: 22,
  },
  {
    name: 'Асти',
    widths: [58],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.8,
    depth: 22,
  },
  {
    name: 'Афина',
    widths: [78],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.8,
    depth: 20,
  },
  {
    name: 'Афина-2',
    widths: [78],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.8,
    depth: 20,
  },
  {
    name: 'Афина-3',
    widths: [78],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.8,
    depth: 20,
  },
  {
    name: 'Бергамо',
    widths: [89],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 5.2,
    depth: 22,
  },
  {
    name: 'Бергамо Ящичный',
    widths: [50],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 5.2,
    depth: 22,
  },
  {
    name: 'Бергонци',
    widths: [78],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.8,
    depth: 21,
  },
  {
    name: 'Бергонци 69',
    widths: [68],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.8,
    depth: 21,
  },
  {
    name: 'Бергонци Ящичный',
    widths: [50],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.8,
    depth: 21,
  },
  {
    name: 'Берта',
    widths: [69],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 5.2,
    depth: 20,
  },
  {
    name: 'Венетто',
    widths: [50.5],
    angle: '45°',
    grooveThickness: 3.7,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 5.7,
    depth: 22.5,
  },
  {
    name: 'Верона',
    widths: [78.5],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.8,
    depth: 20,
  },
  {
    name: 'Верона-2',
    widths: [69],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 5.2,
    depth: 21,
  },
  {
    name: 'Вероника',
    widths: [90],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.8,
    depth: 22,
  },
  {
    name: 'Вероника Ящичный',
    widths: [50],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.8,
    depth: 22,
  },
  {
    name: 'Джульетта',
    widths: [68.3],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.8,
    depth: 20.4,
  },
  {
    name: 'Диона',
    widths: [78.5],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 5.2,
    depth: 20,
  },
  {
    name: 'Доломито',
    widths: [79],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 8,
    depth: 21,
  },
  {
    name: 'Донателло',
    widths: [85],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 5.2,
    depth: 21,
  },
  {
    name: 'Етеринити',
    widths: [89],
    angle: '45°',
    grooveThickness: 0,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 0,
    depth: 0,
  },
  {
    name: 'Жалюзи',
    widths: [70],
    angle: '90°',
    grooveThickness: 6.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 10,
    bottomShelfThickness: 7,
    depth: 21,
  },
  {
    name: 'Инфинити',
    widths: [89.5],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.2,
    depth: 21,
  },
  {
    name: 'Инфинити 69',
    widths: [68],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.2,
    depth: 21,
  },
  {
    name: 'Калабрия',
    widths: [78],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 0,
    depth: 0,
  },
  {
    name: 'Кальяри',
    widths: [89],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 5.2,
    depth: 21,
  },
  {
    name: 'Камила',
    widths: [75],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 4,
    depth: 22.4,
  },
  {
    name: 'Карина',
    widths: [78],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.8,
    depth: 21,
  },
  {
    name: 'Кассиопея ',
    widths: [89.5],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 4,
    depth: 21.2,
  },
  {
    name: 'Катарина',
    widths: [89],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.8,
    depth: 20,
  },
  {
    name: 'Классика 55',
    widths: [55],
    angle: '90°',
    grooveThickness: 6.2,
    grooveDepth: 11,
    chamferSize: 12,
    tenonSize: 17,
    bottomShelfThickness: 5,
    depth: 21,
  },
  {
    name: 'Классика 60',
    widths: [60],
    angle: '90°',
    grooveThickness: 6.2,
    grooveDepth: 11,
    chamferSize: 12,
    tenonSize: 17,
    bottomShelfThickness: 5,
    depth: 21,
  },
  {
    name: 'Классика 65',
    widths: [65],
    angle: '90°',
    grooveThickness: 6.2,
    grooveDepth: 11,
    chamferSize: 12,
    tenonSize: 17,
    bottomShelfThickness: 5,
    depth: 21,
  },
  {
    name: 'Классика 65 (45)',
    widths: [65],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 0,
    depth: 0,
  },
  {
    name: 'Классика 70',
    widths: [70],
    angle: '90°',
    grooveThickness: 6.2,
    grooveDepth: 11,
    chamferSize: 12,
    tenonSize: 17,
    bottomShelfThickness: 5,
    depth: 21,
  },
  {
    name: 'Классика 75',
    widths: [75],
    angle: '90°',
    grooveThickness: 6.2,
    grooveDepth: 11,
    chamferSize: 12,
    tenonSize: 17,
    bottomShelfThickness: 5,
    depth: 21,
  },
  {
    name: 'Классика Двухарочный',
    widths: [65],
    angle: '90°',
    grooveThickness: 6.2,
    grooveDepth: 11,
    chamferSize: 12,
    tenonSize: 17,
    bottomShelfThickness: 5,
    depth: 21,
  },
  {
    name: 'Классика Одноарочный',
    widths: [65],
    angle: '90°',
    grooveThickness: 6.2,
    grooveDepth: 11,
    chamferSize: 12,
    tenonSize: 17,
    bottomShelfThickness: 5,
    depth: 21,
  },
  {
    name: 'Комо',
    widths: [79],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 8,
    depth: 21,
  },
  {
    name: 'Комо Ящичный',
    widths: [50],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 8,
    depth: 21,
  },
  {
    name: 'Леонардо',
    widths: [88],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.8,
    depth: 21,
  },
  {
    name: 'Лувр',
    widths: [90],
    angle: '45°',
    grooveThickness: 0,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 0,
    depth: 0,
  },
  {
    name: 'Луизиана',
    widths: [78],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.8,
    depth: 20,
  },
  {
    name: 'Лукреция',
    widths: [88.5],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.2,
    depth: 21,
  },
  {
    name: 'Мария',
    widths: [78],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 6,
    depth: 20,
  },
  {
    name: 'Милан',
    widths: [85.5],
    angle: '90°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 14.3,
    tenonSize: 17,
    bottomShelfThickness: 5.5,
    depth: 21,
  },
  {
    name: 'Модерн',
    widths: [0],
    angle: '90°',
    grooveThickness: 6.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 10,
    bottomShelfThickness: 7,
    depth: 21,
  },
  {
    name: 'Модерн 55',
    widths: [55],
    angle: '90°',
    grooveThickness: 6.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 10,
    bottomShelfThickness: 7,
    depth: 21,
  },
  {
    name: 'Модерн 65',
    widths: [65],
    angle: '90°',
    grooveThickness: 6.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 10,
    bottomShelfThickness: 7,
    depth: 21,
  },
  {
    name: 'Модерн 70',
    widths: [70],
    angle: '90°',
    grooveThickness: 6.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 10,
    bottomShelfThickness: 7,
    depth: 21,
  },
  {
    name: 'Модерн 80',
    widths: [79],
    angle: '90°',
    grooveThickness: 6.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 10,
    bottomShelfThickness: 7,
    depth: 21,
  },
  {
    name: 'Монтебьянка',
    widths: [89.5],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.8,
    depth: 22.5,
  },
  {
    name: 'Натали',
    widths: [90.5],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.8,
    depth: 21.5,
  },
  {
    name: 'НеоБерта',
    widths: [88],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.2,
    depth: 21,
  },
  {
    name: 'Нео-Классика',
    widths: [83.02],
    angle: '45°',
    grooveThickness: 6.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 10,
    bottomShelfThickness: 4,
    depth: 21,
  },
  {
    name: 'Ника',
    widths: [78],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.8,
    depth: 21,
  },
  {
    name: 'Ника 90',
    widths: [90],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.8,
    depth: 20,
  },
  {
    name: 'Ника Ящичный',
    widths: [50],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.8,
    depth: 21,
  },
  {
    name: 'Нике-Аворио',
    widths: [89],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 5.2,
    depth: 21,
  },
  {
    name: 'Олимп',
    widths: [69],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 5.2,
    depth: 20,
  },
  {
    name: 'Опера',
    widths: [0],
    angle: null,
    grooveThickness: 0,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 0,
    bottomShelfThickness: 0,
    depth: 0,
  },
  {
    name: 'Патриция',
    widths: [85],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.8,
    depth: 20,
  },
  {
    name: 'Персей',
    widths: [67.5],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 4,
    depth: 21.5,
  },
  {
    name: 'Позитано прямой',
    widths: [89],
    angle: '90°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 18.8,
    tenonSize: 17,
    bottomShelfThickness: 3.8,
    depth: 21,
  },
  {
    name: 'Позитано с аркой',
    widths: [89],
    angle: '90°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 18.8,
    tenonSize: 17,
    bottomShelfThickness: 3.8,
    depth: 21,
  },
  {
    name: 'Портофино',
    widths: [70, 50],
    angle: '90°',
    grooveThickness: 6.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 10,
    bottomShelfThickness: 5.2,
    depth: 21,
  },
  {
    name: 'Римини',
    widths: [75],
    angle: '90°',
    grooveThickness: 6.2,
    grooveDepth: 11,
    chamferSize: 12,
    tenonSize: 17,
    bottomShelfThickness: 5,
    depth: 21,
  },
  {
    name: 'Римма',
    widths: [80],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.8,
    depth: 21,
  },
  {
    name: 'Розалия',
    widths: [90],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.2,
    depth: 22,
  },
  {
    name: 'Розалия Ящичный',
    widths: [60],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.2,
    depth: 22,
  },
  {
    name: 'Рузанна',
    widths: [69],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 5.2,
    depth: 21,
  },
  {
    name: 'Саида',
    widths: [88.5],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.8,
    depth: 20,
  },
  {
    name: 'Сирена',
    widths: [75],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.5,
    depth: 22.5,
  },
  {
    name: 'Сицилия',
    widths: [90],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 0,
    bottomShelfThickness: 3.8,
    depth: 20,
  },
  {
    name: 'Скалли',
    widths: [88],
    angle: '90°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 14.5,
    tenonSize: 17,
    bottomShelfThickness: 6.3,
    depth: 20.5,
  },
  {
    name: 'Скалли 69',
    widths: [69],
    angle: '90°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 14.5,
    tenonSize: 17,
    bottomShelfThickness: 6.3,
    depth: 20.5,
  },
  {
    name: 'София',
    widths: [74],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 4,
    depth: 22.4,
  },
  {
    name: 'София 2',
    widths: [73],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 4,
    depth: 22.4,
  },
  {
    name: 'Тарина',
    widths: [80],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.8,
    depth: 21,
  },
  {
    name: 'Тарина Ящичный',
    widths: [50],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.8,
    depth: 21,
  },
  {
    name: 'Татьяна',
    widths: [69],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.8,
    depth: 21,
  },
  {
    name: 'Тиффани',
    widths: [80],
    angle: '45°',
    grooveThickness: 4.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 3.8,
    depth: 21,
  },
  {
    name: 'Флора',
    widths: [79],
    angle: '90°',
    grooveThickness: 6.2,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 10,
    bottomShelfThickness: 7,
    depth: 21,
  },
  {
    name: 'Флоренция',
    widths: [70],
    angle: '90°',
    grooveThickness: 6.2,
    grooveDepth: 11,
    chamferSize: 12,
    tenonSize: 17,
    bottomShelfThickness: 5,
    depth: 21,
  },
  {
    name: 'Орфей',
    widths: [80],
    angle: '45°',
    grooveThickness: 5,
    grooveDepth: 11,
    chamferSize: 0,
    tenonSize: 17,
    bottomShelfThickness: 5,
    depth: 21,
  },
  {
    name: 'Классика',
    widths: [75],
    angle: '90°',
    grooveThickness: 6.2,
    grooveDepth: 11,
    chamferSize: 12,
    tenonSize: 17,
    bottomShelfThickness: 5,
    depth: 21,
  },
  {
    name: 'Виола',
    widths: [86],
    angle: '90°',
    grooveThickness: 6.2,
    grooveDepth: 11,
    chamferSize: 12,
    tenonSize: 17,
    bottomShelfThickness: 4,
    depth: 21,
  },
  {
    name: 'Лондон',
    widths: [70],
    angle: '45°',
    grooveThickness: 6.2,
    grooveDepth: 11,
    chamferSize: 12,
    tenonSize: 17,
    bottomShelfThickness: 4,
    depth: 21,
  },
  {
    name: 'Орфей',
    widths: [80],
    angle: '45°',
    grooveThickness: 6.2,
    grooveDepth: 11,
    chamferSize: 12,
    tenonSize: 17,
    bottomShelfThickness: 4,
    depth: 21,
  },
  {
    name: 'Бостон',
    widths: [75],
    angle: '45°',
    grooveThickness: 6.2,
    grooveDepth: 11,
    chamferSize: 12,
    tenonSize: 17,
    bottomShelfThickness: 4,
    depth: 21,
  },
  {
    name: 'Париж',
    widths: [80],
    angle: '45°',
    grooveThickness: 6.2,
    grooveDepth: 11,
    chamferSize: 12,
    tenonSize: 17,
    bottomShelfThickness: 4,
    depth: 21,
  },
];
