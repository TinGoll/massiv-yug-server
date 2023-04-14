import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PersonEntity } from './person.entity';

@Entity('personal_accounts')
export class FinancialAccount {
  /** Уникальный идентификатор */
  @PrimaryGeneratedColumn()
  id: number;
  /** Дата создания */
  @CreateDateColumn()
  createdAt: Date;
  /** Дата изменения */
  @UpdateDateColumn()
  updatedAt: Date;

  /** Владелец счета */
  @OneToOne(() => PersonEntity, (person) => person.clientAccount, {
    lazy: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'personId' })
  person: Promise<PersonEntity> | PersonEntity;
}
