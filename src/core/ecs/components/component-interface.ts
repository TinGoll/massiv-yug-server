export interface IComponent<T extends object = object> {
  /** Изменяемые / сохраняемые данне компонента */
  data: T;
  /** Вункция, получения данных компонента. */
  getData: () => T;
}
