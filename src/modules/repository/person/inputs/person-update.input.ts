import { PersonRole } from "../entities/person.entity";

export class PersonUpdateInput {
  id: number;
  /** Имя */
  firstName: string;
  /** Фамилия */
  lastName?: string;
  /** Отчество */
  middleName?: string;
  /** Роли */
  personRoles?: PersonRole[];
}

export class PersonClientAccountUpdateInput {}

export class PersonUserAccountUpdateInput {}
