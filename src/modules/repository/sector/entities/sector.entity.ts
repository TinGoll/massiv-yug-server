import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { SampleWorkEntity } from '../../work/entities/sample.work.entity';

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

  @ManyToMany(() => SampleWorkEntity, (work) => work.sectors)
  works: SampleWorkEntity[];
}
