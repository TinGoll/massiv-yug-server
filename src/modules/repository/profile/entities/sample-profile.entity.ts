import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity('profile_samples')
export class ProfileSampleEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ type: 'varchar', length: 256 })
  name: string;
  @Column('enum', { enum: ['90°', '45°'], nullable: true })
  angle: '90°' | '45°';
  /** Толщина профиля */
  @Column({type: "numeric"})
  depth: number;
  /** Толщина паза */
  @Column({type: "numeric"})
  grooveThickness: number;
  /** Глубина паза */
  @Column({type: "numeric"})
  grooveDepth: number;
  /** Размер фаски */
  @Column({type: "numeric"})
  chamferSize: number;
  /** Размер шипа */
  @Column({type: "numeric"})
  tenonSize: number;
  /** Толщина нижней полки */
  @Column({type: "numeric"})
  bottomShelfThickness: number;

  /** Проверить работу массива */
  @Column('simple-array', { default: [0, 0, 0, 0] })
  widths: number[];

  @Column({ type: 'varchar', length: 560, nullable: true })
  drawing: string;

  /** Отметка об удалении */
  @Column('boolean', { default: false })
  deleted: boolean;
}


