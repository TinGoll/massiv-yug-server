import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

export type StatisticType = 'nomenclature_statistics';

@Entity('statistics')
export class StatisticEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'varchar', length: 256 })
  type: StatisticType;

  @Column({ type: 'jsonb', default: {} })
  data: object;
}
