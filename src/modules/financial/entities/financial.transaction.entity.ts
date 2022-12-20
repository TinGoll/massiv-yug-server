import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FinancialAccount } from '../../person/entities/personal.account.entity';

@Entity('financial_transactions')
export class FinancialTransaction {
  /** Уникальный идентификатор */
  @PrimaryGeneratedColumn()
  id: number;
  /** Дата создания */
  @CreateDateColumn()
  createdAt: Date;
  /** Дата изменения */
  @UpdateDateColumn()
  updatedAt: Date;
  /** Тип транзакции */
  @Column({ type: 'varchar', length: 64 })
  type: string;
  /** Название транзакции */
  @Column({ type: 'varchar', length: 64 })
  name: string;
  /** Назначение  */
  @Column({ type: 'varchar', length: 128 })
  purpose: string;
  /** Комментрий */
  @Column({ type: 'varchar', length: 256, nullable: true })
  note: string;
  /** Сумма транзакции */
  @Column({ type: 'float' })
  amount: number;
  /** Персональный счет. */
  @ManyToOne((account) => FinancialAccount, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'accountId' })
  personalAccount: FinancialAccount;
}
