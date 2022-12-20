import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

@Entity('financial_salary')
export class FinancialSalary {
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
  /** Сотрудник */
  person: any;
}
