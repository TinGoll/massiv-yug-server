import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { UserRole, PersonEntity } from "./person.entity";

/** Аккаунт пользователя. */
@Entity('user_account')
export class UserAccount {
  @PrimaryGeneratedColumn()
  id: number;

  // Роли
  @Column({
    type: 'jsonb',
    default: [UserRole.GUEST],
  })
  userRoles: UserRole[];

  @OneToOne(() => PersonEntity, (user) => user.userAccount)
  user: PersonEntity;
}
