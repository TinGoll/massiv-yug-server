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
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';

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
    type: 'set',
    enum: PersonRole,
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

/** Аккаунт пользователя. */
@Entity('user_account')
export class UserAccount {

  @PrimaryGeneratedColumn()
  id: number;

  // Роли
  @Column({
    type: 'set',
    enum: UserRole,
    default: [UserRole.GUEST],
  })
  userRoles: UserRole[];



  @OneToOne(() => PersonEntity, (user) => user.userAccount)
  user: PersonEntity;
}

/** Аккаунт клиента. */
@Entity('client_account')
export class ClientAccount {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => PersonEntity, (photo) => photo.clientAccount)
  clients: PersonEntity[];
}
