import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PersonEntity } from './person.entity';

/**
 * Эта таблица - личный счет.
 */

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
  @OneToOne(() => PersonEntity, (person) => person.userAccount, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'personId' })
  person: PersonEntity;
}
