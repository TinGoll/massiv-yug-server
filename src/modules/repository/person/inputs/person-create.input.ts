import { PersonRole, UserRole } from '../entities/person.entity';

export class PersonCreateInput {
  /** Имя */
  firstName: string;
  /** Фамилия */
  lastName?: string;
  /** Отчество */
  middleName?: string;
  /** Роли */
  personRoles?: PersonRole[];
}

export class PersonClientAccountCreateInput {
  personId: number;
}

export class PersonUserAccountCreateInput {
  personId: number;
  userRoles: UserRole[];
}
