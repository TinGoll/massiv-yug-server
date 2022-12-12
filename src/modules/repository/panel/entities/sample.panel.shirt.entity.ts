import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { SampleWorkEntity } from '../../work/entities/sample.work.entity';

@Entity('sample_shirts')
export class SampleShirtEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  /** Толщина рубашки */
  @Column({ type: 'numeric', nullable: true })
  depthOverlay: number;

  /** Припуск для расчета рубашки */
  @Column({ type: 'numeric', nullable: true })
  indent: number;

  /** Отступ для рубашки */
  @Column({ nullable: true })
  figoreaSize: number;

  @Column('boolean', { default: false })
  deleted: boolean;

  @ManyToMany(() => SampleWorkEntity, { lazy: true })
  @JoinTable()
  works: Promise<SampleWorkEntity[]> | SampleWorkEntity[];
}
