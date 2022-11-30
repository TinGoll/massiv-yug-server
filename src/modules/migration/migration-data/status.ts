export const oldStatuses = [
  { id: 2, statusName: 'Клиент отказался' }, //
  { id: 3, statusName: 'Новый заказ' }, //
  { id: 4, statusName: 'На оформлении' }, //
  { id: 5, statusName: 'Заказ посчитан' }, //
  { id: 7, statusName: 'В работе' }, //
  { id: 8, statusName: 'Завис' }, //
  { id: 9, statusName: 'Отгружен частично' }, //
  { id: 10, statusName: 'Заказ отменен' },  //
  { id: 14, statusName: 'Упакован частично' }, //
  { id: 15, statusName: 'Упакован полностью' }, //
  { id: 17, statusName: 'Отгружен полностью' }, //
  { id: 18, statusName: 'Заказ удален' },//
  { id: 19, statusName: 'Закрыт' },//
  { id: 20, statusName: 'Приняты филенки' },//
  { id: 21, statusName: 'Покинул шлифовку' },//
  { id: 22, statusName: 'Пошлифованы филенки' },//
  { id: 23, statusName: 'Принят на шлифовку' },//
  { id: 24, statusName: 'Завис на Шлифовке' },//
  { id: 26, statusName: 'Покинул лакировку' },//
  { id: 27, statusName: 'На проверке (1)' },//
  { id: 28, statusName: 'Не прошел проверку 1' },//
  { id: 29, statusName: 'Готов к запуску' },//
  { id: 32, statusName: 'Ожидание предоплаты' },
  { id: 33, statusName: 'На проверке (2)' },
  { id: 34, statusName: 'Не прошел проверку 2' },
];

export const newStatuses = [
  {
    name: 'На оформлении',
    index: 1,
    arr: [4, 3, 27, 28, 29, 33, 34],
  },
  {
    name: 'Заказ посчитан',
    index: 1,
    arr: [5],
  },
  {
    name: 'Ожидание предоплаты',
    index: 1,
    arr: [32],
  },
  {
    name: 'В работе',
    index: 1,
    arr: [7, 8, 14, 15, 20, 21, 22, 23, 24, 26],
  },
  {
    name: 'Отменен',
    index: 1,
    arr: [10, 2],
  },
  {
    name: 'Удален',
    index: 1,
    arr: [18],
  },
  {
    name: 'Закрыт',
    index: 1,
    arr: [19],
  },
  {
    name: 'Завершен',
    index: 1,
    arr: [9, 17],
  },
  {
    name: 'Ожидает оплату',
    index: 1,
    arr: [],
  },
  {
    name: 'В ожидании',
    index: 1,
    arr: [],
  },
];
