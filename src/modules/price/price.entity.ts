import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PriceTypes } from './price.types';

@Entity('prices')
export class PriceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column({ type: 'jsonb', default: { elements: [] } as PriceTypes.Root })
  conditionTree: PriceTypes.Root;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
