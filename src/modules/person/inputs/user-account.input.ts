import { UserStatus } from 'src/core/@types/app.types';
import { UserRole } from '../entities/person.user.account.entity';


export class UserAccountCreateInput {
  // Роли
  userRoles?: UserRole[];

  login: string;

  password: string;

  status?: UserStatus;
}

export class UserAccountUpdateInput {
  id: number;
  // Роли
  userRoles?: UserRole[];

  login?: string;

  password?: string;

  status?: UserStatus;
}
