import { ComponentKey } from 'src/modules/ecs/services/component-mapper';

export const migrationNomenclature: NomenclatureMigration[] = [
  {
    name: 'No Name',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        default: [
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
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        default: {
          height: 0,
          width: 0,
          depth: 21,
          amount: 0,
        },
      },
    ],
    body: [
      {
        identifier: 'Фасад витрина',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фасад витрина с накладной решеткой',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фасад глухой',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фасад глухой с накладной X решеткой',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фасад образец',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фасад портальный боковой',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фасад портальный с крылом',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фасад с диагональной решеткой',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фасад с решеткой ДЕКОР',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фасад с решеткой ЖАЛЮЗИ',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фасад с решеткой КВАДРО',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фасад с решеткой РЕЗНОЙ',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фасад с решеткой РОМБ',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
    ],
  },
  {
    name: 'Профиль',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        default: {
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
        default: {
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
          { componentName: 'component_geometry', default: { depth: 10 } },
        ],
      },
      {
        identifier: 'Щит Буазери 16мм',
        componentData: [
          { componentName: 'component_geometry', default: { depth: 16 } },
        ],
      },
      {
        identifier: 'Щит Буазери 16мм +шпон',
        componentData: [
          { componentName: 'component_geometry', default: { depth: 16 } },
        ],
      },
      {
        identifier: 'Щит МДФ 10мм',
        componentData: [
          { componentName: 'component_geometry', default: { depth: 10 } },
        ],
      },
      {
        identifier: 'Щит МДФ 10мм +шпон',
        componentData: [
          { componentName: 'component_geometry', default: { depth: 10 } },
        ],
      },
      {
        identifier: 'Щит МДФ 10мм +шпон резной',
        componentData: [
          { componentName: 'component_geometry', default: { depth: 10 } },
        ],
      },
      {
        identifier: 'Щит МДФ 12мм',
        componentData: [
          { componentName: 'component_geometry', default: { depth: 12 } },
        ],
      },
      {
        identifier: 'Щит МДФ 12мм +шпон',
        componentData: [
          { componentName: 'component_geometry', default: { depth: 12 } },
        ],
      },
      {
        identifier: 'Щит МДФ 16мм',
        componentData: [
          { componentName: 'component_geometry', default: { depth: 16 } },
        ],
      },
      {
        identifier: 'Щит МДФ 16мм +шпон',
        componentData: [
          { componentName: 'component_geometry', default: { depth: 16 } },
        ],
      },
      {
        identifier: 'Щит МДФ 16мм +шпон резной',
        componentData: [
          { componentName: 'component_geometry', default: { depth: 16 } },
        ],
      },
      {
        identifier: 'Щит МДФ 16мм резной',
        componentData: [
          { componentName: 'component_geometry', default: { depth: 16 } },
        ],
      },
      {
        identifier: 'Щит МДФ 19 мм + шпон',
        componentData: [
          { componentName: 'component_geometry', default: { depth: 19 } },
        ],
      },
      {
        identifier: 'Щит МДФ 22мм',
        componentData: [
          { componentName: 'component_geometry', default: { depth: 22 } },
        ],
      },
      {
        identifier: 'Щит МДФ 22мм +шпон',
        componentData: [
          { componentName: 'component_geometry', default: { depth: 22 } },
        ],
      },
      {
        identifier: 'Щит МДФ 32мм',
        componentData: [
          { componentName: 'component_geometry', default: { depth: 32 } },
        ],
      },
      {
        identifier: 'Щит МДФ 32мм +шпон',
        componentData: [
          { componentName: 'component_geometry', default: { depth: 32 } },
        ],
      },
      {
        identifier: 'Щит МДФ 3мм +шпон',
        componentData: [
          { componentName: 'component_geometry', default: { depth: 3 } },
        ],
      },
      {
        identifier: 'Щит МДФ 6мм',
        componentData: [
          { componentName: 'component_geometry', default: { depth: 6 } },
        ],
      },
      {
        identifier: 'Щит МДФ 6мм +шпон',
        componentData: [
          { componentName: 'component_geometry', default: { depth: 6 } },
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
        default: {
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
          { componentName: 'component_geometry', default: { depth: 10 } },
        ],
      },
      {
        identifier: 'Щит массив 16 мм',
        componentData: [
          { componentName: 'component_geometry', default: { depth: 16 } },
        ],
      },
      {
        identifier: 'Щит массив 20 мм',
        componentData: [
          { componentName: 'component_geometry', default: { depth: 20 } },
        ],
      },
      {
        identifier: 'Щит массив 25 мм',
        componentData: [
          { componentName: 'component_geometry', default: { depth: 25 } },
        ],
      },
      {
        identifier: 'Щит массив 30 мм',
        componentData: [
          { componentName: 'component_geometry', default: { depth: 30 } },
        ],
      },
      {
        identifier: 'Щит массив 32 мм',
        componentData: [
          { componentName: 'component_geometry', default: { depth: 32 } },
        ],
      },
      {
        identifier: 'Щит массив 40 мм',
        componentData: [
          { componentName: 'component_geometry', default: { depth: 40 } },
        ],
      },
      {
        identifier: 'Щит массив 40 мм резной',
        componentData: [
          { componentName: 'component_geometry', default: { depth: 40 } },
        ],
      },
      {
        identifier: 'Щит массив 50 мм',
        componentData: [
          { componentName: 'component_geometry', default: { depth: 50 } },
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
        default: {
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
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Колонна №1',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Колонна №10 Корона',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Колонна №11 Корона',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Колонна №2',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Колонна №3',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Колонна №4',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Колонна №5',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Колонна №6',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Колонна №8',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Колонна №9',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Колонна Алиери Корона',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Колонна АЛИЕРИ медальон',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Колонна ДЕКОР №2',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Колонна нестандарт',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Колонна Розалия №1',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Колонна Розалия №2',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Колонна Руста',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Колонна Тиффани',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
    ],
  },
  {
    name: 'Фасад комбинированный',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        default: {
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
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фасад комб. 2 филенки',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фасад комб. 3 филенки',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фасад комб. глухой + рамка внизу',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фасад комб. глухой + рамка с раскл. внизу',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фасад комб. глухой с балясинами',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фасад комб. Глухой+ реш. КВАДРО',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фасад комб. глухой+реш.ДЕКОР внизу',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фасад комб. глухой+реш.ДИАГ. вверху',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фасад комб. глухой+реш.ДИАГ. внизу',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фасад комб. рам+рам с накладной Х решеткой',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фасад комб. рамка с балясинами',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фасад комб. Рамка с раскл.+глухой',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фасад комб. рамка+глухой',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фасад комб. рамка+реш.ДИАГ.внизу',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фасад комб. реш.ДЕКОР с балясинами',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фасад комб. реш.диаг. с балясинами',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фасад комб. реш.КВАДРО с балясинами',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фасад комбинированный нестандарт',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
    ],
  },
  {
    name: 'Коромысло',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        default: {
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
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Коромысло №2',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Коромысло №3',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Коромысло №5',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Коромысло АЛИЕРИ',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Коромысло без декора',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Коромысло двуарочное',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Коромысло двуарочное без цветка',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Коромысло двуарочное с цветком',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Коромысло одноарочное',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
    ],
  },
  {
    name: 'Карниз',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        default: {
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
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Карниз низкий',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Карниз Патриция',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Карниз Портофино',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Карниз Риальто',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Карниз Риальто нижний',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Карниз Фаворит',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Карниз Элит',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
    ],
  },
  {
    name: 'R-Карниз',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        default: {
          depth: 0,
          amount: 0,
        },
      },
    ],
    body: [
      {
        identifier: 'R-карниз Алиери',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'R-карниз вогнутый Алиери',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'R-карниз вогнутый Элит',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'R-карниз низкий',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'R-Карниз Патриция',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'R-карниз Риальто',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'R-карниз Риальто удлиненный',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'R-карниз Фаворит',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'R-карниз Фаворит удлиненный',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'R-карниз Элит',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'R-карниз Элит удлиненный',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'R-Подкарнизник больш.',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
    ],
  },
  {
    name: 'Световая планка',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        default: {
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
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'R-карниз Нижний',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'R-карниз Нижний вогнутый',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'R-карниз Нижний удлиненный',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'R-карниз Риальто нижний',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
    ],
  },
  {
    name: 'R-Подкарнизник',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        default: {
          amount: 0,
        },
      },
    ],
    body: [
      {
        identifier: 'R-Подкарнизник мал.',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'R-Подкарнизник сред.',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
    ],
  },
  {
    name: 'Цоколь',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        default: {
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
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Цоколь массив 16мм',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Цоколь Нестандарт',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Цоколь Простой',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Цоколь с фрезеровкой',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Цоколь Сапожок',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
    ],
  },
  {
    name: 'R-Цоколь',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        default: {
          amount: 0,
        },
      },
    ],
    body: [
      {
        identifier: 'R-Цоколь Волна',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'R-Цоколь массив',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'R-Цоколь массив удлиненный',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'R-Цоколь Простой',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'R-Цоколь Простой удлиненный',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'R-Цоколь Сапожок',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'R-цоколь Сапожок вогнутый',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'R-Цоколь Сапожок удлиненный',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
    ],
  },
  {
    name: 'R-Профиль',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        default: {
          amount: 0,
        },
      },
    ],
    body: [
      {
        identifier: 'R-профиль под стекло',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'R-профиль под филенку',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
    ],
  },
  {
    name: 'R-Филенка',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        default: {
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
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
    ],
  },
  {
    name: 'Заготовка для колонны',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        default: {
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
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
    ],
  },
  {
    name: 'Декор резной',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        default: {
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
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Декор резной №2',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Декор резной №2 с платформой',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Декор резной №3 Корона',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Декор резной №3 Корона с платформой',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Декор резной нестандарт',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Ножка резная',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Портальный декор №2 с площадкой т.23',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Соеденитель цоколя',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фронтон',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
    ],
  },
  {
    name: 'Фальш-панель',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        default: {
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
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Фальш-панель с фрезеровкой',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
    ],
  },
  {
    name: 'Рейка подперильная',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        default: {
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
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Рейка подперильная, 60х10',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
    ],
  },
  {
    name: 'Столб',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        default: {
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
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Столб Лорд',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Столб Рим',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Угловая балясина (столб), 80х80',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
    ],
  },
  {
    name: 'ЧМЗ',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        default: {
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
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'ЧМЗ 80мм',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
    ],
  },
  {
    name: 'Шар для столба',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        default: {
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
            default: { height: 100, width: 100 },
          },
        ],
      },
      {
        identifier: 'Шар для столба, 80х80',
        componentData: [
          {
            componentName: 'component_geometry',
            default: { height: 80, width: 80 },
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
        default: {
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
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Окончание поручня, 60мм',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
    ],
  },
  {
    name: 'Подступенок',
    components: ['component_geometry'],
    default: [
      {
        componentName: 'component_geometry',
        default: {
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
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
      {
        identifier: 'Подступенок, 16мм',
        componentData: [{ componentName: 'component_geometry', default: {} }],
      },
    ],
  },
];

interface NomenclatureMigration {
  name: string;
  components: EntityComponents[];
  default: Array<ComponentData>;
  body: Array<ElementBody>;
}

interface ComponentData {
  componentName: EntityComponents;
  default: object;
}

interface ElementBody {
  identifier: string;
  componentData: Array<ComponentData>;
}

type EntityComponents = ComponentKey;
