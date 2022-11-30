import { ProfileData, WorkData } from 'src/core/@types/app.types';
import {
  ComponentDefaultData,
  ComponentKey,
} from 'src/modules/repository/order/entities/element.entity';

export const migrationNomenclature: NomenclatureMigration[] = [
  {
    name: 'No Name',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        data: [
          {
            height: 0,
            width: 0,
            depth: 0,
            amount: 0,
          },
        ],
      },
    ],
    body: [],
  },
  {
    name: 'Фасад',
    components: [
      'component_geometry',
      'component_works',
      'component_panel',
      'component_profile',
    ],
    default: [
      {
        // 8 Подбор профиля
        // 9 Запил
        // 10 Мастер Джон
        // 11 Пятый
        // 12 Вайма
        // 6 Шлифовка плоских изделий
        componentName: 'component_works',
        data: {
          workData: [
            { workId: 8 },
            { workId: 9 },
            { workId: 10 },
            { workId: 11 },
            { workId: 12 },
            { workId: 6 },
          ],
        },
      },
      {
        componentName: 'component_geometry',
        data: {
          height: 0,
          width: 0,
          depth: 21,
          amount: 0,
        },
      },
      {
        componentName: 'component_profile',
        data: {
          profiles: [
            { name: 'Левый' },
            { name: 'Верхний' },
            { name: 'Правый' },
            { name: 'Нижний' },
          ],
        } as ProfileData,
      },
    ],
    body: [
      {
        identifier: 'Фасад витрина',
        componentData: [{ componentName: 'component_panel', data: null }],
      },
      {
        identifier: 'Фасад витрина с накладной решеткой',
        componentData: [{ componentName: 'component_panel', data: null }],
      },
      {
        identifier: 'Фасад глухой',
        componentData: [],
      },
      {
        identifier: 'Фасад глухой с накладной X решеткой',
        componentData: [],
      },
      {
        identifier: 'Фасад образец',
        componentData: [],
      },
      {
        identifier: 'Фасад портальный боковой',
        componentData: [],
      },
      {
        identifier: 'Фасад портальный с крылом',
        componentData: [],
      },
      {
        identifier: 'Фасад с диагональной решеткой',
        componentData: [],
      },
      {
        identifier: 'Фасад с решеткой ДЕКОР',
        componentData: [],
      },
      {
        identifier: 'Фасад с решеткой ЖАЛЮЗИ',
        componentData: [],
      },
      {
        identifier: 'Фасад с решеткой КВАДРО',
        componentData: [],
      },
      {
        identifier: 'Фасад с решеткой РЕЗНОЙ',
        componentData: [],
      },
      {
        identifier: 'Фасад с решеткой РОМБ',
        componentData: [],
      },
    ],
  },
  {
    name: 'Профиль',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        data: {
          height: 0,
          width: 0,
          depth: 0,
          amount: 0,
        },
      },
    ],
    body: [{ identifier: 'Профиль', componentData: [] }],
  },
  {
    name: 'Щит МДФ',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        data: {
          height: 0,
          width: 0,
          depth: 0,
          amount: 0,
        },
      },
    ],
    body: [
      {
        identifier: 'Щит Буазери 10мм +шпон',
        componentData: [
          { componentName: 'component_geometry', data: { depth: 10 } },
        ],
      },
      {
        identifier: 'Щит Буазери 16мм',
        componentData: [
          { componentName: 'component_geometry', data: { depth: 16 } },
        ],
      },
      {
        identifier: 'Щит Буазери 16мм +шпон',
        componentData: [
          { componentName: 'component_geometry', data: { depth: 16 } },
        ],
      },
      {
        identifier: 'Щит МДФ 10мм',
        componentData: [
          { componentName: 'component_geometry', data: { depth: 10 } },
        ],
      },
      {
        identifier: 'Щит МДФ 10мм +шпон',
        componentData: [
          { componentName: 'component_geometry', data: { depth: 10 } },
        ],
      },
      {
        identifier: 'Щит МДФ 10мм +шпон резной',
        componentData: [
          { componentName: 'component_geometry', data: { depth: 10 } },
        ],
      },
      {
        identifier: 'Щит МДФ 12мм',
        componentData: [
          { componentName: 'component_geometry', data: { depth: 12 } },
        ],
      },
      {
        identifier: 'Щит МДФ 12мм +шпон',
        componentData: [
          { componentName: 'component_geometry', data: { depth: 12 } },
        ],
      },
      {
        identifier: 'Щит МДФ 16мм',
        componentData: [
          { componentName: 'component_geometry', data: { depth: 16 } },
        ],
      },
      {
        identifier: 'Щит МДФ 16мм +шпон',
        componentData: [
          { componentName: 'component_geometry', data: { depth: 16 } },
        ],
      },
      {
        identifier: 'Щит МДФ 16мм +шпон резной',
        componentData: [
          { componentName: 'component_geometry', data: { depth: 16 } },
        ],
      },
      {
        identifier: 'Щит МДФ 16мм резной',
        componentData: [
          { componentName: 'component_geometry', data: { depth: 16 } },
        ],
      },
      {
        identifier: 'Щит МДФ 19 мм + шпон',
        componentData: [
          { componentName: 'component_geometry', data: { depth: 19 } },
        ],
      },
      {
        identifier: 'Щит МДФ 22мм',
        componentData: [
          { componentName: 'component_geometry', data: { depth: 22 } },
        ],
      },
      {
        identifier: 'Щит МДФ 22мм +шпон',
        componentData: [
          { componentName: 'component_geometry', data: { depth: 22 } },
        ],
      },
      {
        identifier: 'Щит МДФ 32мм',
        componentData: [
          { componentName: 'component_geometry', data: { depth: 32 } },
        ],
      },
      {
        identifier: 'Щит МДФ 32мм +шпон',
        componentData: [
          { componentName: 'component_geometry', data: { depth: 32 } },
        ],
      },
      {
        identifier: 'Щит МДФ 3мм +шпон',
        componentData: [
          { componentName: 'component_geometry', data: { depth: 3 } },
        ],
      },
      {
        identifier: 'Щит МДФ 6мм',
        componentData: [
          { componentName: 'component_geometry', data: { depth: 6 } },
        ],
      },
      {
        identifier: 'Щит МДФ 6мм +шпон',
        componentData: [
          { componentName: 'component_geometry', data: { depth: 6 } },
        ],
      },
    ],
  },
  {
    name: 'Щит массив',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        data: {
          height: 0,
          width: 0,
          depth: 0,
          amount: 0,
        },
      },
    ],
    body: [
      {
        identifier: 'Щит массив 10 мм',
        componentData: [
          { componentName: 'component_geometry', data: { depth: 10 } },
        ],
      },
      {
        identifier: 'Щит массив 16 мм',
        componentData: [
          { componentName: 'component_geometry', data: { depth: 16 } },
        ],
      },
      {
        identifier: 'Щит массив 20 мм',
        componentData: [
          { componentName: 'component_geometry', data: { depth: 20 } },
        ],
      },
      {
        identifier: 'Щит массив 25 мм',
        componentData: [
          { componentName: 'component_geometry', data: { depth: 25 } },
        ],
      },
      {
        identifier: 'Щит массив 30 мм',
        componentData: [
          { componentName: 'component_geometry', data: { depth: 30 } },
        ],
      },
      {
        identifier: 'Щит массив 32 мм',
        componentData: [
          { componentName: 'component_geometry', data: { depth: 32 } },
        ],
      },
      {
        identifier: 'Щит массив 40 мм',
        componentData: [
          { componentName: 'component_geometry', data: { depth: 40 } },
        ],
      },
      {
        identifier: 'Щит массив 40 мм резной',
        componentData: [
          { componentName: 'component_geometry', data: { depth: 40 } },
        ],
      },
      {
        identifier: 'Щит массив 50 мм',
        componentData: [
          { componentName: 'component_geometry', data: { depth: 50 } },
        ],
      },
    ],
  },
  {
    name: 'Колонна',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        data: {
          height: 0,
          width: 0,
          depth: 0,
          amount: 0,
        },
      },
    ],
    body: [
      {
        identifier: 'Бутылочница резная',
        componentData: [],
      },
      {
        identifier: 'Колонна №1',
        componentData: [],
      },
      {
        identifier: 'Колонна №10 Корона',
        componentData: [],
      },
      {
        identifier: 'Колонна №11 Корона',
        componentData: [],
      },
      {
        identifier: 'Колонна №2',
        componentData: [],
      },
      {
        identifier: 'Колонна №3',
        componentData: [],
      },
      {
        identifier: 'Колонна №4',
        componentData: [],
      },
      {
        identifier: 'Колонна №5',
        componentData: [],
      },
      {
        identifier: 'Колонна №6',
        componentData: [],
      },
      {
        identifier: 'Колонна №8',
        componentData: [],
      },
      {
        identifier: 'Колонна №9',
        componentData: [],
      },
      {
        identifier: 'Колонна Алиери Корона',
        componentData: [],
      },
      {
        identifier: 'Колонна АЛИЕРИ медальон',
        componentData: [],
      },
      {
        identifier: 'Колонна ДЕКОР №2',
        componentData: [],
      },
      {
        identifier: 'Колонна нестандарт',
        componentData: [],
      },
      {
        identifier: 'Колонна Розалия №1',
        componentData: [],
      },
      {
        identifier: 'Колонна Розалия №2',
        componentData: [],
      },
      {
        identifier: 'Колонна Руста',
        componentData: [],
      },
      {
        identifier: 'Колонна Тиффани',
        componentData: [],
      },
    ],
  },
  {
    name: 'Фасад комбинированный',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        data: {
          height: 0,
          width: 0,
          depth: 21,
          amount: 0,
        },
      },
    ],
    body: [
      {
        identifier: 'Фасад комб. 2 рамки',
        componentData: [],
      },
      {
        identifier: 'Фасад комб. 2 филенки',
        componentData: [],
      },
      {
        identifier: 'Фасад комб. 3 филенки',
        componentData: [],
      },
      {
        identifier: 'Фасад комб. глухой + рамка внизу',
        componentData: [],
      },
      {
        identifier: 'Фасад комб. глухой + рамка с раскл. внизу',
        componentData: [],
      },
      {
        identifier: 'Фасад комб. глухой с балясинами',
        componentData: [],
      },
      {
        identifier: 'Фасад комб. Глухой+ реш. КВАДРО',
        componentData: [],
      },
      {
        identifier: 'Фасад комб. глухой+реш.ДЕКОР внизу',
        componentData: [],
      },
      {
        identifier: 'Фасад комб. глухой+реш.ДИАГ. вверху',
        componentData: [],
      },
      {
        identifier: 'Фасад комб. глухой+реш.ДИАГ. внизу',
        componentData: [],
      },
      {
        identifier: 'Фасад комб. рам+рам с накладной Х решеткой',
        componentData: [],
      },
      {
        identifier: 'Фасад комб. рамка с балясинами',
        componentData: [],
      },
      {
        identifier: 'Фасад комб. Рамка с раскл.+глухой',
        componentData: [],
      },
      {
        identifier: 'Фасад комб. рамка+глухой',
        componentData: [],
      },
      {
        identifier: 'Фасад комб. рамка+реш.ДИАГ.внизу',
        componentData: [],
      },
      {
        identifier: 'Фасад комб. реш.ДЕКОР с балясинами',
        componentData: [],
      },
      {
        identifier: 'Фасад комб. реш.диаг. с балясинами',
        componentData: [],
      },
      {
        identifier: 'Фасад комб. реш.КВАДРО с балясинами',
        componentData: [],
      },
      {
        identifier: 'Фасад комбинированный нестандарт',
        componentData: [],
      },
    ],
  },
  {
    name: 'Коромысло',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        data: {
          height: 0,
          width: 0,
          depth: 0,
          amount: 0,
        },
      },
    ],
    body: [
      {
        identifier: 'Коромысло №1',
        componentData: [],
      },
      {
        identifier: 'Коромысло №2',
        componentData: [],
      },
      {
        identifier: 'Коромысло №3',
        componentData: [],
      },
      {
        identifier: 'Коромысло №5',
        componentData: [],
      },
      {
        identifier: 'Коромысло АЛИЕРИ',
        componentData: [],
      },
      {
        identifier: 'Коромысло без декора',
        componentData: [],
      },
      {
        identifier: 'Коромысло двуарочное',
        componentData: [],
      },
      {
        identifier: 'Коромысло двуарочное без цветка',
        componentData: [],
      },
      {
        identifier: 'Коромысло двуарочное с цветком',
        componentData: [],
      },
      {
        identifier: 'Коромысло одноарочное',
        componentData: [],
      },
    ],
  },
  {
    name: 'Карниз',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        data: {
          height: 0,
          width: 0,
          depth: 0,
          amount: 0,
        },
      },
    ],
    body: [
      {
        identifier: 'Карниз Алиери',
        componentData: [],
      },
      {
        identifier: 'Карниз низкий',
        componentData: [],
      },
      {
        identifier: 'Карниз Патриция',
        componentData: [],
      },
      {
        identifier: 'Карниз Портофино',
        componentData: [],
      },
      {
        identifier: 'Карниз Риальто',
        componentData: [],
      },
      {
        identifier: 'Карниз Риальто нижний',
        componentData: [],
      },
      {
        identifier: 'Карниз Фаворит',
        componentData: [],
      },
      {
        identifier: 'Карниз Элит',
        componentData: [],
      },
    ],
  },
  {
    name: 'R-Карниз',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        data: {
          depth: 0,
          amount: 0,
        },
      },
    ],
    body: [
      {
        identifier: 'R-карниз Алиери',
        componentData: [],
      },
      {
        identifier: 'R-карниз вогнутый Алиери',
        componentData: [],
      },
      {
        identifier: 'R-карниз вогнутый Элит',
        componentData: [],
      },
      {
        identifier: 'R-карниз низкий',
        componentData: [],
      },
      {
        identifier: 'R-Карниз Патриция',
        componentData: [],
      },
      {
        identifier: 'R-карниз Риальто',
        componentData: [],
      },
      {
        identifier: 'R-карниз Риальто удлиненный',
        componentData: [],
      },
      {
        identifier: 'R-карниз Фаворит',
        componentData: [],
      },
      {
        identifier: 'R-карниз Фаворит удлиненный',
        componentData: [],
      },
      {
        identifier: 'R-карниз Элит',
        componentData: [],
      },
      {
        identifier: 'R-карниз Элит удлиненный',
        componentData: [],
      },
      {
        identifier: 'R-Подкарнизник больш.',
        componentData: [],
      },
    ],
  },
  {
    name: 'Световая планка',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        data: {
          height: 0,
          width: 0,
          depth: 0,
          amount: 0,
        },
      },
    ],
    body: [
      {
        identifier: 'R-карниз Алиери нижний',
        componentData: [],
      },
      {
        identifier: 'R-карниз Нижний',
        componentData: [],
      },
      {
        identifier: 'R-карниз Нижний вогнутый',
        componentData: [],
      },
      {
        identifier: 'R-карниз Нижний удлиненный',
        componentData: [],
      },
      {
        identifier: 'R-карниз Риальто нижний',
        componentData: [],
      },
    ],
  },
  {
    name: 'R-Подкарнизник',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        data: {
          amount: 0,
        },
      },
    ],
    body: [
      {
        identifier: 'R-Подкарнизник мал.',
        componentData: [],
      },
      {
        identifier: 'R-Подкарнизник сред.',
        componentData: [],
      },
    ],
  },
  {
    name: 'Цоколь',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        data: {
          height: 0,
          width: 0,
          depth: 0,
          amount: 0,
        },
      },
    ],
    body: [
      {
        identifier: 'Цоколь Волна',
        componentData: [],
      },
      {
        identifier: 'Цоколь массив 16мм',
        componentData: [],
      },
      {
        identifier: 'Цоколь Нестандарт',
        componentData: [],
      },
      {
        identifier: 'Цоколь Простой',
        componentData: [],
      },
      {
        identifier: 'Цоколь с фрезеровкой',
        componentData: [],
      },
      {
        identifier: 'Цоколь Сапожок',
        componentData: [],
      },
    ],
  },
  {
    name: 'R-Цоколь',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        data: {
          amount: 0,
        },
      },
    ],
    body: [
      {
        identifier: 'R-Цоколь Волна',
        componentData: [],
      },
      {
        identifier: 'R-Цоколь массив',
        componentData: [],
      },
      {
        identifier: 'R-Цоколь массив удлиненный',
        componentData: [],
      },
      {
        identifier: 'R-Цоколь Простой',
        componentData: [],
      },
      {
        identifier: 'R-Цоколь Простой удлиненный',
        componentData: [],
      },
      {
        identifier: 'R-Цоколь Сапожок',
        componentData: [],
      },
      {
        identifier: 'R-цоколь Сапожок вогнутый',
        componentData: [],
      },
      {
        identifier: 'R-Цоколь Сапожок удлиненный',
        componentData: [],
      },
    ],
  },
  {
    name: 'R-Профиль',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        data: {
          amount: 0,
        },
      },
    ],
    body: [
      {
        identifier: 'R-профиль под стекло',
        componentData: [],
      },
      {
        identifier: 'R-профиль под филенку',
        componentData: [],
      },
    ],
  },
  {
    name: 'R-Филенка',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        data: {
          height: 0,
          width: 0,
          depth: 0,
          amount: 0,
        },
      },
    ],
    body: [
      {
        identifier: 'R-Филенка',
        componentData: [],
      },
    ],
  },
  {
    name: 'Заготовка для колонны',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        data: {
          height: 0,
          width: 0,
          depth: 0,
          amount: 0,
        },
      },
    ],
    body: [
      {
        identifier: 'Заготовка для колонны',
        componentData: [],
      },
    ],
  },
  {
    name: 'Декор резной',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        data: {
          height: 0,
          width: 0,
          depth: 0,
          amount: 0,
        },
      },
    ],
    body: [
      {
        identifier: 'Декор резной №1 Рим',
        componentData: [],
      },
      {
        identifier: 'Декор резной №2',
        componentData: [],
      },
      {
        identifier: 'Декор резной №2 с платформой',
        componentData: [],
      },
      {
        identifier: 'Декор резной №3 Корона',
        componentData: [],
      },
      {
        identifier: 'Декор резной №3 Корона с платформой',
        componentData: [],
      },
      {
        identifier: 'Декор резной нестандарт',
        componentData: [],
      },
      {
        identifier: 'Ножка резная',
        componentData: [],
      },
      {
        identifier: 'Портальный декор №2 с площадкой т.23',
        componentData: [],
      },
      {
        identifier: 'Соеденитель цоколя',
        componentData: [],
      },
      {
        identifier: 'Фронтон',
        componentData: [],
      },
    ],
  },
  {
    name: 'Фальш-панель',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        data: {
          height: 0,
          width: 0,
          depth: 0,
          amount: 0,
        },
      },
    ],
    body: [
      {
        identifier: 'Фальш-панель без фрезеровки',
        componentData: [],
      },
      {
        identifier: 'Фальш-панель с фрезеровкой',
        componentData: [],
      },
    ],
  },
  {
    name: 'Рейка подперильная',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        data: {
          height: 0,
          width: 0,
          depth: 0,
          amount: 0,
        },
      },
    ],
    body: [
      {
        identifier: 'Рейка подперильная, 50х10',
        componentData: [],
      },
      {
        identifier: 'Рейка подперильная, 60х10',
        componentData: [],
      },
    ],
  },
  {
    name: 'Столб',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        data: {
          height: 0,
          width: 0,
          depth: 0,
          amount: 0,
        },
      },
    ],
    body: [
      {
        identifier: 'Столб заказной',
        componentData: [],
      },
      {
        identifier: 'Столб Лорд',
        componentData: [],
      },
      {
        identifier: 'Столб Рим',
        componentData: [],
      },
      {
        identifier: 'Угловая балясина (столб), 80х80',
        componentData: [],
      },
    ],
  },
  {
    name: 'ЧМЗ',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        data: {
          height: 0,
          width: 0,
          depth: 0,
          amount: 0,
        },
      },
    ],
    body: [
      {
        identifier: 'ЧМЗ 100мм',
        componentData: [],
      },
      {
        identifier: 'ЧМЗ 80мм',
        componentData: [],
      },
    ],
  },
  {
    name: 'Шар для столба',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        data: {
          height: 0,
          width: 0,
          depth: 0,
          amount: 0,
        },
      },
    ],
    body: [
      {
        identifier: 'Шар для столба, 100х100',
        componentData: [
          {
            componentName: 'component_geometry',
            data: { height: 100, width: 100 },
          },
        ],
      },
      {
        identifier: 'Шар для столба, 80х80',
        componentData: [
          {
            componentName: 'component_geometry',
            data: { height: 80, width: 80 },
          },
        ],
      },
    ],
  },
  {
    name: 'Окончание поручня',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        data: {
          height: 0,
          width: 0,
          depth: 0,
          amount: 0,
        },
      },
    ],
    body: [
      {
        identifier: 'Окончание поручня, 20мм',
        componentData: [],
      },
      {
        identifier: 'Окончание поручня, 60мм',
        componentData: [],
      },
    ],
  },
  {
    name: 'Подступенок',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        data: {
          height: 0,
          width: 0,
          depth: 0,
          amount: 0,
        },
      },
    ],
    body: [
      {
        identifier: 'Подступенок прямой',
        componentData: [],
      },
      {
        identifier: 'Подступенок, 16мм',
        componentData: [],
      },
    ],
  },
];

interface NomenclatureMigration {
  name: string;
  components: EntityComponents[];
  default: Array<ComponentDefaultData>;
  body: Array<ElementBody>;
}

interface ElementBody {
  identifier: string;
  componentData: Array<ComponentDefaultData>;
}

type EntityComponents = ComponentKey;
