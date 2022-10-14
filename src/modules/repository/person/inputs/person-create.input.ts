import { ClientAccount } from '../entities/client-account.entity';
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

export interface PersonClientAccountCreateInput extends Partial<ClientAccount> {}

export class PersonUserAccountCreateInput {
  login: string;
  password: string;
  userRoles: UserRole[];
  status?: 'active' | 'fired';
  personId?: number;
}
