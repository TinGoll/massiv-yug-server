import { PersonRole } from '../entities/person.entity';

/** Набор полей необходимых для добавления человка */
export class PersonCreateInput {
  /** Имя */
  firstName: string;
  /** Фамилия */
  lastName?: string;
  /** Отчество */
  middleName?: string;
  // Роли
  personRoles?: PersonRole[];
}
/** Набор полей необходимых для обновления человка */
export class PersonUpdateInput {
  /** id человека */
  id: number;
  /** Имя */
  firstName?: string;
  /** Фамилия */
  lastName?: string;
  /** Отчество */
  middleName?: string;
  // Роли
  personRoles?: PersonRole[];
}
