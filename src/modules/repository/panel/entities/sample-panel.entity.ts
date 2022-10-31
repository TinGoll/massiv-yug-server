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
  @Column({ type: 'varchar', length: 256, nullable: true })
  shirtName: string;

  /** Толщина рубашки */
  @Column({ type: "numeric", nullable: true })
  depthOverlay: number;

  /** Припуск для расчета рубашки */
  @Column({ type: "numeric", nullable: true })
  indent: number;

  /** Отступ для рубашки */
  @Column({ nullable: true })
  figoreaSize: number;

  @Column({ type: 'varchar', length: 560, nullable: true })
  drawing: string;

  @Column('boolean', { default: false })
  deleted: boolean;
}
