// Роли person, общие
export enum PersonRole {
  USER = 'user',
  CLIENT = 'client',
  WORKER = 'employee',
}

/** Роли пользователя */
export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  GUEST = 'guest',
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ClientAccount } from './client-account.entity';
import { UserAccount } from './user-account.entity';


export class СommonPerson {
  /** id человека */
  @PrimaryGeneratedColumn()
  id: number;
  // Имя фамилия отчество
  /** Имя */
  @Column({ type: 'varchar', length: 256 })
  firstName: string;
  /** Фамилия */
  @Column({ type: 'varchar', length: 256 })
  lastName: string;
  /** Отчество */
  @Column({ type: 'varchar', length: 256 })
  middleName: string;

  /** Дата создания */
  @CreateDateColumn()
  createdAt: Date;

  /** Дата изменения */
  @UpdateDateColumn()
  updatedAt: Date;

  /** Отметка об удалении */
  @Column('boolean', { default: false })
  deleted: boolean;
}

@Entity('persons')
export class PersonEntity extends СommonPerson {
  // Роли
  @Column({
    type: 'jsonb',
    default: [PersonRole.USER, PersonRole.CLIENT],
  })
  personRoles: PersonRole[];

  /** Подключение аккаунта клиента  */
  @ManyToOne(() => ClientAccount, (account) => account.clients, {
    eager: true,
  })
  @JoinColumn({ name: 'clientAccountId' })
  clientAccount: ClientAccount;

  @OneToOne(() => UserAccount, (account) => account.user)
  @JoinColumn({ name: 'userAccountId' })
  userAccount: UserAccount;
}

