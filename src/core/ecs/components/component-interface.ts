import { ComponentKey } from 'src/modules/repository/order/entities/element.entity';

export interface IComponent<T extends object = object> {
  /** Изменяемые / сохраняемые данне компонента */
  data: T;
  /** Вункция, получения данных компонента. */
  getData: () => T;

  // Добавлен ключь для удобного поиска и сиехронизации.
  key?: ComponentKey;
}
