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
import { PersonAddress } from './person.address.entity';
import { PersonBankAccount } from './person.bank.account.entity';
import { PersonCard } from './person.card.entity';
import { ClientAccount } from './person.client.account.entity';
import { PersonEmail } from './person.email.entity';
import { PersonPhone } from './person.phone.entity';
import { UserAccount } from './person.user.account.entity';

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

@Entity('persons')
export class PersonEntity {
  /** id человека */
  @PrimaryGeneratedColumn()
  id: number;

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

  // Роли
  @Column({
    type: 'jsonb',
    default: [PersonRole.USER],
  })
  personRoles: PersonRole[];

  @OneToMany(() => PersonAddress, (bankAccount) => bankAccount.person)
  /** Список адресов */
  addresses: PersonAddress[];

  @OneToMany(() => PersonBankAccount, (bankAccount) => bankAccount.person)
  /** БАнковский счет */
  bankAccounts: PersonBankAccount[];

  @OneToMany(() => PersonCard, (card) => card.person)
  /** Банковские карты */
  cards: PersonCard[];

  @OneToMany(() => PersonEmail, (email) => email.person)
  /** Списко адресов электронной почты */
  emails: PersonEmail[];

  @OneToMany(() => PersonPhone, (phone) => phone.person)
  /** Список телефонов */
  phones: PersonPhone[];

  @OneToOne(() => ClientAccount, (account) => account.person)
  /** Аккаунт клиента  */
  clientAccount: ClientAccount;

  /** Подключение аккаунат пользователя */
  @OneToOne(() => UserAccount, (account) => account.person)
  userAccount: UserAccount;
}
