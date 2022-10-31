import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { WorkSampleEntity } from '../../work/entities/work-sample.emtity';

@Entity('sectors')
export class SectorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  orderBy: number;

  @Column('boolean', { default: false })
  deleted: boolean;

  @ManyToMany(() => WorkSampleEntity, (work) => work.sectors)
  works: WorkSampleEntity[];
}
