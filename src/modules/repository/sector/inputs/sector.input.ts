import { SplicingAngle } from 'src/core/@types/app.types';

/** Набор полей необходимых для добавления сектора */
export class SectorCreateInput {
  name: string;
  orderBy?: number;
}
/** Набор полей необходимых для обновления сектора */
export class SectorUpdateInput {
  id: number;
  name?: string;
  orderBy?: number;
}
