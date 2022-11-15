/** Набор полей необходимых для добавления цвета */
export class PanelCreateInput {
  name: string;
  /** Название рубашки */
  shirtName?: string;

  /** Толщина рубашки */
  depthOverlay?: number;

  /** Припуск для расчета рубашки */
  indent?: number;

  /** Отступ для рубашки */
  figoreaSize?: number;

  /** ссылка на схему */
  drawing?: string;
}
/** Набор полей необходимых для обновления цвета */
export class PanelUpdateInput {
  id: number;

  name?: string;

  /** Название рубашки */
  shirtName?: string;

  /** Толщина рубашки */
  depthOverlay?: number;

  /** Припуск для расчета рубашки */
  indent?: number;

  /** Отступ для рубашки */
  figoreaSize?: number;

  /** ссылка на схему */
  drawing?: string;
}
