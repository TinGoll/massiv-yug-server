import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { PersonRole } from '../enums/person-role.enum';
import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../types/user.status.type';
import { PersonAddress } from './person.address.entity';
import { PersonBankAccount } from './person.bank.account.entity';
import { PersonBarcodeEntity } from './person.barcode.entity';
import { PersonCard } from './person.card.entity';
import { ClientAccount } from './person.client.account.entity';
import { PersonEmail } from './person.email.entity';
import { PersonPhone } from './person.phone.entity';

import { FinancialAccount } from './personal.account.entity';

@Entity('persons')
export class PersonEntity {
  /** id человека */
  @PrimaryGeneratedColumn()
  id: number;

  /** Дата создания */
  @CreateDateColumn()
  createdAt: Date;

  /** Дата изменения */
  @UpdateDateColumn()
  updatedAt: Date;

  /** Имя */
  @Column({ type: 'varchar', length: 256, nullable: true })
  firstName: string;
  /** Фамилия */
  @Column({ type: 'varchar', length: 256, nullable: true })
  lastName: string;
  /** Отчество */
  @Column({ type: 'varchar', length: 256, nullable: true })
  middleName: string;

  /** Отметка об удалении */
  @Column('boolean', { default: false })
  deleted: boolean;

  // Роли
  @Column({
    type: 'jsonb',
    default: [PersonRole.USER],
  })
  personRoles: PersonRole[];

  // Роли Пользователя
  @Column({
    type: 'jsonb',
    default: [UserRole.GUEST],
  })
  userRoles: UserRole[];

  // Логин - уникальное имя пользователя.
  @Column({ type: 'varchar', length: 128 })
  login: string;

  // Пароль доступа, хранится в зашифрованном виде.
  // По умолчанию, пароль не попадает в выборку.
  @Column({ select: false })
  password?: string;

  @Column({ nullable: true })
  gender: 'Male' | 'Female';

  // Статус пользователя,
  @Column({
    type: 'enum',
    enum: ['fired', 'active', 'banned'] as UserStatus[],
    default: 'active',
  })
  status: UserStatus;

  @Column({ type: 'jsonb', default: {}, nullable: true })
  settings: object;

  // Подключаемые таблицы
  @OneToMany(() => PersonAddress, (bankAccount) => bankAccount.person, {
    lazy: true,
  })
  /** Список адресов */
  addresses: PersonAddress[] | Promise<PersonAddress[]>;

  @OneToMany(() => PersonBankAccount, (bankAccount) => bankAccount.person, {
    lazy: true,
  })
  /** БАнковский счет */
  bankAccounts: PersonBankAccount[] | Promise<PersonBankAccount[]>;

  @OneToMany(() => PersonCard, (card) => card.person, { lazy: true })
  /** Банковские карты */
  cards: PersonCard[] | Promise<PersonCard[]>;

  @OneToMany(() => PersonEmail, (email) => email.person, { lazy: true })
  /** Списко адресов электронной почты */
  emails: PersonEmail[] | Promise<PersonEmail[]>;

  @OneToMany(() => PersonPhone, (phone) => phone.person, { lazy: true })
  /** Список телефонов */
  phones: PersonPhone[] | Promise<PersonPhone[]>;

  @OneToMany(() => PersonBarcodeEntity, (barcode) => barcode.person, {
    lazy: true,
  })
  /** Список штрихкодов */
  barcodes: PersonBarcodeEntity[] | Promise<PersonBarcodeEntity[]>;

  @OneToOne(() => ClientAccount, (account) => account.person, { lazy: true })
  /** Аккаунт клиента  */
  clientAccount: ClientAccount | Promise<ClientAccount>;

  // /** Подключение аккаунат пользователя */
  // @OneToOne(() => UserAccount, (account) => account.person, { lazy: true })
  // userAccount: UserAccount | Promise<UserAccount>;

  /** Подключение аккаунат пользователя */
  @OneToOne(() => FinancialAccount, (account) => account.person, { lazy: true })
  personalAccount: FinancialAccount | Promise<FinancialAccount>;
}
