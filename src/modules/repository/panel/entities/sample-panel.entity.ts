
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity('panel_samples')
export class PanelSampleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  /** Название рубашки */
  @Column({ type: 'varchar', length: 256 })
  shirtName: string;

  /** Толщина рубашки */
  @Column()
  depthOverlay: number;

  /** Припуск для расчета рубашки */
  @Column()
  indent: number;

  /** Отступ для рубашки */
  @Column()
  figoreaSize: number;

  @Column({ type: 'varchar', length: 560 })
  drawing: string;

  @Column('boolean', { default: false })
  deleted: boolean;
}



