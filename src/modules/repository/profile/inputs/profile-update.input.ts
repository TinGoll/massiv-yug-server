export class ProfileUpdateInput {
  id: number;
  name?: string;
  angle?: '90°' | '45°';
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
  /** Проверить работу массива */
  widths?: number[];
  drawing?: string;
}
