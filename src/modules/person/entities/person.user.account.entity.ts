import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../types/user.status.type';




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

  @Column({select: false })
  password?: string;

  @Column({
    type: 'enum',
    enum: ['fired', 'active'] as UserStatus[],
    default: 'active',
  })
  status: UserStatus;

  // @OneToOne(() => PersonEntity, (person) => person.userAccount, {
  //   onDelete: 'CASCADE',
  //   lazy: true,
  // })
  // @JoinColumn({ name: 'personId' })
  // person: PersonEntity | Promise<PersonEntity>;
}
