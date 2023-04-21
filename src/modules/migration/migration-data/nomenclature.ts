import CombinedFacadeComponentTypes from 'src/core/ecs/components/combined.facade.component';
import FacadeComponentTypes from 'src/core/ecs/components/facade.component';
import PriceComponentTypes from 'src/core/ecs/components/price.component';
import WorkComponentTypes from 'src/core/ecs/components/works.component';
import {
  ComponentDefaultData,
  ComponentKey,
} from 'src/modules/repository/order/entities/element.entity';
import { WorkKey } from 'src/modules/repository/work/inputs/work.input';

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
      'component_facade',
      'component_price',
      'component_works',
    ],
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
      {
        componentName: 'component_price',
        data: { price: 8000, unit: 'м²' },
      } as ComponentDefaultData<PriceComponentTypes.PriceComponentData>,
      {
        componentName: 'component_facade',
        data: {
          type: 'Фасад',
          panelWorks: [
            { name: 'Склейка на мембранном прессе' },
            { name: 'Шлифовка плоских изделий' },
            { name: 'Шлифовка на шлифовальных центрах' },
          ] as WorkComponentTypes.Work<WorkKey>[],
          shirtWorks: [
            { name: 'Склейка на мембранном прессе' },
            { name: 'Шлифовка плоских изделий' },
            { name: 'Шлифовка на шлифовальных центрах' },
          ] as WorkComponentTypes.Work<WorkKey>[],
          profileWorks: [
            { name: 'Подбор профиля' },
          ] as WorkComponentTypes.Work<WorkKey>[],
        },
      } as ComponentDefaultData<FacadeComponentTypes.ComponentData>,
      {
        componentName: 'component_works',
        data: {
          works: [
            { name: 'Запил' },
            { name: 'Вайма' },
            { name: 'Мастер Джон' },
            { name: 'Пятый' },
            { name: 'Шлифовка плоских изделий' },
            { name: 'Шлифовка на шлифовальных центрах' },
          ],
        },
      } as ComponentDefaultData<WorkComponentTypes.WorkComponentData<WorkKey>>,
    ],
    body: [
      {
        identifier: 'Фасад витрина',
        componentData: [
          {
            componentName: 'component_facade',
            data: {
              type: 'Фасад',
              panel: {
                name: 'Витрина',
                type: 'Витрина',
              },
            },
          } as ComponentDefaultData<FacadeComponentTypes.ComponentData>,
        ],
      },
      {
        identifier: 'Фасад витрина с накладной решеткой',
        componentData: [
          {
            componentName: 'component_facade',
            data: {
              type: 'Фасад',
              panel: {
                name: 'Витрина',
                type: 'Витрина',
              },
              overlayElement: {
                type: 'Накладной элемент',
                name: 'накладная решетка',
              },
            },
          } as ComponentDefaultData<FacadeComponentTypes.ComponentData>,
        ],
      },
      {
        identifier: 'Фасад глухой',
        componentData: [],
      },
      {
        identifier: 'Фасад глухой с накладной X решеткой',
        componentData: [
          {
            componentName: 'component_facade',
            data: {
              type: 'Фасад',
              overlayElement: {
                type: 'Накладной элемент',
                name: 'накладная X решетка',
              },
            },
          } as ComponentDefaultData<FacadeComponentTypes.ComponentData>,
        ],
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
        componentData: [
          {
            componentName: 'component_facade',
            data: {
              type: 'Фасад',
              panel: {
                type: 'Решётка',
                name: 'Решётка диагональная',
              },
            },
          } as ComponentDefaultData<FacadeComponentTypes.ComponentData>,
        ],
      },
      {
        identifier: 'Фасад с решеткой ДЕКОР',
        componentData: [
          {
            componentName: 'component_facade',
            data: {
              type: 'Фасад',
              panel: {
                type: 'Решётка',
                name: 'решетка декор',
              },
            },
          } as ComponentDefaultData<FacadeComponentTypes.ComponentData>,
        ],
      },
      {
        identifier: 'Фасад с решеткой ЖАЛЮЗИ',
        componentData: [
          {
            componentName: 'component_facade',
            data: {
              type: 'Фасад',
              panel: {
                type: 'Решётка',
                name: 'решетка жалюзи',
              },
            },
          } as ComponentDefaultData<FacadeComponentTypes.ComponentData>,
        ],
      },
      {
        identifier: 'Фасад с решеткой КВАДРО',
        componentData: [
          {
            componentName: 'component_facade',
            data: {
              type: 'Фасад',
              panel: {
                type: 'Решётка',
                name: 'решетка квадро',
              },
            },
          } as ComponentDefaultData<FacadeComponentTypes.ComponentData>,
        ],
      },
      {
        identifier: 'Фасад с решеткой РЕЗНОЙ',
        componentData: [
          {
            componentName: 'component_facade',
            data: {
              type: 'Фасад',
              panel: {
                type: 'Решётка',
                name: 'решетка резная',
              },
            },
          } as ComponentDefaultData<FacadeComponentTypes.ComponentData>,
        ],
      },
      {
        identifier: 'Фасад с решеткой РОМБ',
        componentData: [
          {
            componentName: 'component_facade',
            data: {
              type: 'Фасад',
              panel: {
                type: 'Решётка',
                name: 'решетка ромб',
              },
            },
          } as ComponentDefaultData<FacadeComponentTypes.ComponentData>,
        ],
      },
    ],
  },
  {
    name: 'Профиль',
    components: [
      'component_geometry',
      'component_product_profile',
      'component_works',
    ],
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
      {
        componentName: 'component_price',
        data: { price: 500, unit: 'м.п' },
      } as ComponentDefaultData<PriceComponentTypes.PriceComponentData>,
    ],
    body: [],
  },
  {
    name: 'Щит МДФ',
    components: [
      'component_geometry',
      'component_shield',
      'component_price',
      'component_works',
    ],
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
      {
        componentName: 'component_price',
        data: { price: 4000, unit: 'м²' },
      } as ComponentDefaultData<PriceComponentTypes.PriceComponentData>,
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
    components: [
      'component_geometry',
      'component_shield',
      'component_price',
      'component_works',
    ],
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
      {
        componentName: 'component_price',
        data: { price: 6000, unit: 'м²' },
      } as ComponentDefaultData<PriceComponentTypes.PriceComponentData>,
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
    components: [
      'component_geometry',
      'component_column',
      'component_price',
      'component_works',
    ],
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
      {
        componentName: 'component_price',
        data: { price: 5000, unit: 'шт.' },
      } as ComponentDefaultData<PriceComponentTypes.PriceComponentData>,
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
    components: [
      'component_geometry',
      'component_combined_facade',
      'component_price',
      'component_works',
    ],
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
      {
        componentName: 'component_price',
        data: { price: 10000, unit: 'м²' },
      } as ComponentDefaultData<PriceComponentTypes.PriceComponentData>,
      {
        componentName: 'component_combined_facade',
        data: {
          balusterSize: 113,
        },
      } as ComponentDefaultData<CombinedFacadeComponentTypes.CombinedFacadeData>,
    ],
    body: [
      {
        identifier: 'Фасад комб. 2 рамки',
        componentData: [
          {
            componentName: 'component_combined_facade',
            data: {
              type: 'Комбинированный фасад',
              panels: [
                {
                  name: 'Витрина',
                  type: 'Витрина',
                },
                {
                  name: 'Витрина',
                  type: 'Витрина',
                },
              ],
            },
          } as ComponentDefaultData<CombinedFacadeComponentTypes.CombinedFacadeData>,
        ],
      },
      {
        identifier: 'Фасад комб. 2 филенки',
        componentData: [
          {
            componentName: 'component_combined_facade',
            data: {
              type: 'Комбинированный фасад',
              panels: [
                {
                  type: 'Филёнка',
                },
                {
                  type: 'Филёнка',
                },
              ],
            },
          } as ComponentDefaultData<CombinedFacadeComponentTypes.CombinedFacadeData>,
        ],
      },
      {
        identifier: 'Фасад комб. 3 филенки',
        componentData: [
          {
            componentName: 'component_combined_facade',
            data: {
              type: 'Комбинированный фасад',
              panels: [
                {
                  type: 'Филёнка',
                },
                {
                  type: 'Филёнка',
                },
                {
                  type: 'Филёнка',
                },
              ],
            },
          } as ComponentDefaultData<CombinedFacadeComponentTypes.CombinedFacadeData>,
        ],
      },
      {
        identifier: 'Фасад комб. глухой + рамка внизу',
        componentData: [
          {
            componentName: 'component_combined_facade',
            data: {
              type: 'Комбинированный фасад',
              panels: [
                {
                  type: 'Витрина',
                  name: 'Витрина',
                },
                {
                  type: 'Филёнка',
                },
              ],
            },
          } as ComponentDefaultData<CombinedFacadeComponentTypes.CombinedFacadeData>,
        ],
      },
      {
        identifier: 'Фасад комб. глухой + рамка с раскл. внизу',
        componentData: [
          {
            componentName: 'component_combined_facade',
            data: {
              type: 'Комбинированный фасад',
              panels: [
                {
                  type: 'Витрина',
                  name: 'Витрина',
                },
                {
                  type: 'Филёнка',
                },
              ],
            },
          } as ComponentDefaultData<CombinedFacadeComponentTypes.CombinedFacadeData>,
        ],
      },
      {
        identifier: 'Фасад комб. глухой с балясинами',
        componentData: [
          {
            componentName: 'component_combined_facade',
            data: {
              type: 'Комбинированный фасад',
              panels: [
                {
                  type: 'Балюстрада',
                },
                {
                  type: 'Филёнка',
                },
              ],
            },
          } as ComponentDefaultData<CombinedFacadeComponentTypes.CombinedFacadeData>,
        ],
      },
      {
        identifier: 'Фасад комб. Глухой+ реш. КВАДРО',
        componentData: [
          {
            componentName: 'component_combined_facade',
            data: {
              type: 'Комбинированный фасад',
              panels: [
                {
                  type: 'Решётка',
                  name: 'Квадро',
                },
                {
                  type: 'Филёнка',
                },
              ],
            },
          } as ComponentDefaultData<CombinedFacadeComponentTypes.CombinedFacadeData>,
        ],
      },
      {
        identifier: 'Фасад комб. глухой+реш.ДЕКОР внизу',
        componentData: [
          {
            componentName: 'component_combined_facade',
            data: {
              type: 'Комбинированный фасад',
              panels: [
                {
                  type: 'Решётка',
                  name: 'Декор',
                },
                {
                  type: 'Филёнка',
                },
              ],
            },
          } as ComponentDefaultData<CombinedFacadeComponentTypes.CombinedFacadeData>,
        ],
      },
      {
        identifier: 'Фасад комб. глухой+реш.ДИАГ. вверху',
        componentData: [
          {
            componentName: 'component_combined_facade',
            data: {
              type: 'Комбинированный фасад',
              panels: [
                {
                  type: 'Филёнка',
                },
                {
                  type: 'Решётка',
                  name: 'Решётка диагональная',
                },
              ],
            },
          } as ComponentDefaultData<CombinedFacadeComponentTypes.CombinedFacadeData>,
        ],
      },
      {
        identifier: 'Фасад комб. глухой+реш.ДИАГ. внизу',
        componentData: [
          {
            componentName: 'component_combined_facade',
            data: {
              type: 'Комбинированный фасад',
              panels: [
                {
                  type: 'Решётка',
                  name: 'Решётка диагональная',
                },
                {
                  type: 'Филёнка',
                },
              ],
            },
          } as ComponentDefaultData<CombinedFacadeComponentTypes.CombinedFacadeData>,
        ],
      },
      {
        identifier: 'Фасад комб. рам+рам с накладной Х решеткой',
        componentData: [
          {
            componentName: 'component_combined_facade',
            data: {
              type: 'Комбинированный фасад',
              panels: [
                {
                  type: 'Витрина',
                  name: 'Витрина',
                },
                {
                  type: 'Витрина',
                  name: 'Витрина',
                },
              ],
              overlayElements: [
                {
                  type: 'Накладной элемент',
                  name: 'Накладная Х решетка',
                },
                null,
              ],
            },
          } as ComponentDefaultData<CombinedFacadeComponentTypes.CombinedFacadeData>,
        ],
      },
      {
        identifier: 'Фасад комб. рамка с балясинами',
        componentData: [
          {
            componentName: 'component_combined_facade',
            data: {
              type: 'Комбинированный фасад',
              panels: [
                {
                  type: 'Балюстрада',
                  name: 'Балюстрада',
                },
                {
                  type: 'Витрина',
                  name: 'Витрина',
                },
              ],
            },
          } as ComponentDefaultData<CombinedFacadeComponentTypes.CombinedFacadeData>,
        ],
      },
      {
        identifier: 'Фасад комб. Рамка с раскл.+глухой',
        componentData: [
          {
            componentName: 'component_combined_facade',
            data: {
              type: 'Комбинированный фасад',
              panels: [
                {
                  type: 'Витрина',
                  name: 'Витрина',
                },
                {
                  type: 'Филёнка',
                },
              ],
              overlayElements: [
                null,
                {
                  type: 'Накладной элемент',
                  name: 'раскл.',
                },
              ],
            },
          } as ComponentDefaultData<CombinedFacadeComponentTypes.CombinedFacadeData>,
        ],
      },
      {
        identifier: 'Фасад комб. рамка+глухой',
        componentData: [
          {
            componentName: 'component_combined_facade',
            data: {
              panels: [
                {
                  type: 'Филёнка',
                },
                {
                  type: 'Витрина',
                  name: 'Витрина',
                },
              ],
            },
          } as ComponentDefaultData<CombinedFacadeComponentTypes.CombinedFacadeData>,
        ],
      },
      {
        identifier: 'Фасад комб. рамка+реш.ДИАГ.внизу',
        componentData: [
          {
            componentName: 'component_combined_facade',
            data: {
              panels: [
                {
                  type: 'Решётка',
                  name: 'Решётка диагональная',
                },
                {
                  type: 'Филёнка',
                },
              ],
            },
          } as ComponentDefaultData<CombinedFacadeComponentTypes.CombinedFacadeData>,
        ],
      },
      {
        identifier: 'Фасад комб. реш.ДЕКОР с балясинами',
        componentData: [
          {
            componentName: 'component_combined_facade',
            data: {
              panels: [
                {
                  type: 'Балюстрада',
                  name: 'Балюстрада',
                },
                {
                  type: 'Решётка',
                  name: 'Решётка Декор',
                },
              ],
            },
          } as ComponentDefaultData<CombinedFacadeComponentTypes.CombinedFacadeData>,
        ],
      },
      {
        identifier: 'Фасад комб. реш.диаг. с балясинами',
        componentData: [
          {
            componentName: 'component_combined_facade',
            data: {
              panels: [
                {
                  type: 'Балюстрада',
                  name: 'Балюстрада',
                },
                {
                  type: 'Решётка',
                  name: 'Решётка диагональная',
                },
              ],
            },
          } as ComponentDefaultData<CombinedFacadeComponentTypes.CombinedFacadeData>,
        ],
      },
      {
        identifier: 'Фасад комб. реш.КВАДРО с балясинами',
        componentData: [
          {
            componentName: 'component_combined_facade',
            data: {
              panels: [
                {
                  type: 'Балюстрада',
                  name: 'Балюстрада',
                },
                {
                  type: 'Решётка',
                  name: 'Квадро',
                },
              ],
            },
          } as ComponentDefaultData<CombinedFacadeComponentTypes.CombinedFacadeData>,
        ],
      },
      {
        identifier: 'Фасад комбинированный нестандарт',
        componentData: [],
      },
    ],
  },
  {
    name: 'Коромысло',
    components: ['component_geometry', 'component_koromyslo'],
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
      {
        componentName: 'component_price',
        data: { price: 1500, unit: 'шт.' },
      } as ComponentDefaultData<PriceComponentTypes.PriceComponentData>,
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
    components: ['component_geometry', 'component_cornice', 'component_price'],
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
      {
        componentName: 'component_price',
        data: { price: 1200, unit: 'м.п' },
      } as ComponentDefaultData<PriceComponentTypes.PriceComponentData>,
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
    components: [
      'component_geometry',
      'component_light_bar',
      'component_price',
    ],
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
    components: ['component_geometry', 'component_plinth'],
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
    components: ['component_geometry', 'component_carved_decor'],
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
    components: ['component_geometry', 'component_trim_panel'],
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
    components: ['component_geometry', 'component_pillar'],
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
    components: ['component_geometry', 'component_CMZ'],
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
