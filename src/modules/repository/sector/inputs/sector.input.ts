import { SplicingAngle } from 'src/core/@types/app.types';
import { Blank } from '../entities/sector.entity';
import { WorkKey } from '../../work/inputs/work.input';

/** Набор полей необходимых для добавления сектора */
export class SectorCreateInput {
  name: string;
  orderBy?: number;
  sectorLoad?: number;
  blanks?: Blank[];
  works?: WorkKey[];
}
/** Набор полей необходимых для обновления сектора */
export class SectorUpdateInput {
  id: number;
  name?: string;
  orderBy?: number;
  sectorLoad?: number;
  blanks?: Blank[];
}
