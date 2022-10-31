import { Unit } from 'src/core/types/model-types/other-types';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { SectorEntity } from '../../sector/entities/sector-entity';

@Entity('work_samples')
export class WorkSampleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  norm: number;

  @Column({ type: 'varchar', default: 'шт.' })
  unit: Unit;

  @Column({type:"jsonb", default: {}})
  data: any;

  @Column('boolean', { default: false })
  deleted: boolean;

  @ManyToMany(() => SectorEntity, (sector) => sector.works)
  @JoinTable()
  sectors: SectorEntity[];
}
