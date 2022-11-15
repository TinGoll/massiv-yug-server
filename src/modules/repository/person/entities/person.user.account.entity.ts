import { UserStatus } from 'src/core/@types/app.types';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserRole, PersonEntity } from './person.entity';

/** Аккаунт пользователя. */
@Entity('person_user_account')
export class UserAccount {
  @PrimaryGeneratedColumn()
  id: number;
  // Роли
  @Column({
    type: 'jsonb',
    default: [UserRole.GUEST],
  })
  userRoles: UserRole[];

  @Column({ type: 'varchar', length: 128 })
  login: string;

  @Column({ type: 'varchar', length: 128 })
  password: string;

  @Column({
    type: 'enum',
    enum: ['fired', 'active'] as UserStatus[],
    default: 'active',
  })
  status: UserStatus;

  @OneToOne(() => PersonEntity, (person) => person.userAccount, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'personId' })
  person: PersonEntity;
}
