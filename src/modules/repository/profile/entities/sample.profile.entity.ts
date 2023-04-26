import { SplicingAngle } from 'src/core/@types/app.types';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { SampleWorkEntity } from '../../work/entities/sample.work.entity';

@Entity('sample_profiles')
export class SampleProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ type: 'varchar', length: 256 })
  name: string;
  @Column('enum', { enum: ['90°', '45°'] as SplicingAngle[], nullable: true })
  angle: SplicingAngle;

  @Column({ type: 'smallint', nullable: true })
  transverseInside: number;

  /** Толщина профиля */
  @Column({ type: 'numeric' })
  depth: number;
  /** Толщина паза */
  @Column({ type: 'numeric' })
  grooveThickness: number;
  /** Глубина паза */
  @Column({ type: 'numeric' })
  grooveDepth: number;
  /** Размер фаски */
  @Column({ type: 'numeric' })
  chamferSize: number;
  /** Размер шипа */
  @Column({ type: 'numeric' })
  tenonSize: number;
  /** Толщина нижней полки */
  @Column({ type: 'numeric' })
  bottomShelfThickness: number;

  /** Проверить работу массива */
  @Column('simple-array', { default: [0, 0, 0, 0] })
  widths: number[];

  /** Ссылка на схему. */
  @Column({ type: 'varchar', length: 560, nullable: true })
  drawing: string;
  
  @Column({ type: 'varchar', length: 128, nullable: true })
  group: string;

  /** Отметка об удалении */
  @Column('boolean', { default: false })
  deleted: boolean;

  @ManyToMany(() => SampleWorkEntity, { eager: true })
  @JoinTable()
  works: SampleWorkEntity[];
}
