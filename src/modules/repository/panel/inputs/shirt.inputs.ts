import { SampleWorkEntity } from '../../work/entities/sample.work.entity';

export class ShirtCreateInput {
  name: string;
  /** Толщина рубашки */
  depthOverlay?: number;
  /** Припуск для расчета рубашки */
  indent?: number;
  /** Отступ для рубашки */
  figoreaSize?: number;
}
export class ShirtUpdateInput {
  /** id рубашки */
  id: number;
  /** Название ребашки */
  name?: string;
  /** Толщина рубашки */
  depthOverlay?: number;
  /** Припуск для расчета рубашки */
  indent?: number;
  /** Отступ для рубашки */
  figoreaSize?: number;
  /** Массив работ */
  works?: SampleWorkEntity[];
}
