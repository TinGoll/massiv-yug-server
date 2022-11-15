import { SplicingAngle } from 'src/core/@types/app.types';

/** Набор полей необходимых для добавления профиля */
export class ProfileCreateInput {
  name: string;

  angle?: SplicingAngle;
  /** Толщина профиля */

  depth?: number;
  /** Толщина паза */

  grooveThickness?: number;
  /** Глубина паза */

  grooveDepth?: number;
  /** Размер фаски */

  chamferSize?: number;
  /** Размер шипа */

  tenonSize?: number;
  /** Толщина нижней полки */

  bottomShelfThickness?: number;

  widths?: number[];

  /** Ссылка на схему. */

  drawing?: string;
}
/** Набор полей необходимых для обновления профиля */
export class ProfileUpdateInput {
  id: number;

  name?: string;

  angle?: SplicingAngle;
  /** Толщина профиля */

  depth?: number;
  /** Толщина паза */

  grooveThickness?: number;
  /** Глубина паза */

  grooveDepth?: number;
  /** Размер фаски */

  chamferSize?: number;
  /** Размер шипа */

  tenonSize?: number;
  /** Толщина нижней полки */

  bottomShelfThickness?: number;

  widths?: number[];

  /** Ссылка на схему. */

  drawing?: string;
}
