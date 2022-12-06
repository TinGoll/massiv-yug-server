import { PanelType } from 'src/core/@types/app.types';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { SampleWorkEntity } from '../../work/entities/sample.work.entity';
import { SampleShirtEntity } from './sample.panel.shirt.entity';

@Entity('sample_panels')
export class SamplePanelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  panelType: PanelType;

  /** ссылка на схему */
  @Column({ type: 'varchar', length: 560, nullable: true })
  drawing: string;

  /** Отступ для рубашки */
  @Column({ type: "float", nullable: true })
  figoreaSize: number;

  @ManyToOne((shirt) => SampleShirtEntity, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'shirtId' })
  /** Шаблон цвета */
  shirt: SampleShirtEntity;

  @Column('boolean', { default: false })
  deleted: boolean;

  @ManyToMany(() => SampleWorkEntity, {})
  @JoinTable()
  works: SampleWorkEntity[];
}
