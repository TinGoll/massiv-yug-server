// Роли person, общие
export enum PersonRole {
  USER = 'user',
  CLIENT = 'client',
  WORKER = 'employee',
}

/** Роли пользователя */
export enum UserRole {
  ADMIN = 'Админ',
  MANAGER = 'Менеджер',
  SBORKA = 'Сборка',
  SHLIFOVKA = 'Шлифовка',
  LAKIROVKA = 'Лакировка',
  UPAKOVKA = 'Упаковка',
  GUEST = 'Гость',
  ACCOUNTANT = 'Бухгалтер',
  GRAND_PACKER = 'Главный упаковщик',
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
  OneToMany,
} from 'typeorm';
import { ClientAccount } from './client-account.entity';
import { PersonAddress } from './person-address';
import { PersonBankAccount } from './person-bank-account.entity';
import { PersonCard } from './person-card-entity';
import { PersonEmail } from './person-email-entity';
import { PersonPhone } from './person-phone-entity';
import { UserAccount } from './user-account.entity';

export class СommonPerson {
  /** id человека */
  @PrimaryGeneratedColumn()
  id: number;
  // Имя фамилия отчество
  /** Имя */
  @Column({ type: 'varchar', length: 256, nullable: true })
  firstName: string;
  /** Фамилия */
  @Column({ type: 'varchar', length: 256, nullable: true })
  lastName: string;
  /** Отчество */
  @Column({ type: 'varchar', length: 256, nullable: true })
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
    default: [PersonRole.USER],
  })
  personRoles: PersonRole[];

  /** Подключение аккаунта клиента  */
  @OneToOne(() => ClientAccount, (account) => account.person, {
    // eager: true,
  })
  clientAccount: ClientAccount;

  /** Подключение аккаунат пользователя */
  @OneToOne(() => UserAccount, (account) => account.person, {
    //  eager: true,
  })
  userAccount: UserAccount;

  @OneToMany(() => PersonPhone, (phone) => phone.person, {
    eager: true,
  })
  phones: PersonPhone[];

  @OneToMany(() => PersonCard, (card) => card.person, {
    eager: true,
  })
  cards: PersonCard[];

  @OneToMany(() => PersonEmail, (email) => email.person, {
    eager: true,
  })
  emails: PersonEmail[];

  @OneToMany(() => PersonBankAccount, (bankAccount) => bankAccount.person, {
    eager: true,
  })
  bankAccounts: PersonBankAccount[];

  @OneToMany(() => PersonAddress, (bankAccount) => bankAccount.person, {
    eager: true,
  })
  addresses: PersonAddress[];
}
