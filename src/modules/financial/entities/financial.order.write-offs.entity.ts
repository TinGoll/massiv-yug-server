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

@Entity('financial_order_write_offs')
export class FinancialWriteOffs {
  /** Уникальный идентификатор */
  @PrimaryGeneratedColumn()
  id: number;
  /** Дата создания */
  @CreateDateColumn()
  createdAt: Date;
  /** Дата изменения */
  @UpdateDateColumn()
  updatedAt: Date;
  /** Сумма списания */
  @Column({ type: 'float' })
  amount: number;
  /** Заказ */
  order: any;
}
