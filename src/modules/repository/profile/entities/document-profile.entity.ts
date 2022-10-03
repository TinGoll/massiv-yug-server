
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
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
  @Column()
  depth: number;
  /** Толщина паза */
  @Column()
  grooveThickness: number;
  /** Глубина паза */
  @Column()
  grooveDepth: number;
  /** Размер фаски */
  @Column()
  chamferSize: number;
  /** Размер шипа */
  @Column()
  tenonSize: number;
  /** Толщина нижней полки */
  @Column()
  bottomShelfThickness: number;

  @Column()
  widths: number[];

  @Column({ type: 'varchar', length: 560 })
  drawing: string;

  /** Отметка об удалении */
  @Column('boolean', { default: false })
  deleted: boolean;
}

@Entity("document_profiles")
export class DocumentProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  widths: number[];

  @Column('enum', { enum: ['90°', '45°'], nullable: true })
  angle: '90°' | '45°';

  @ManyToOne((type) => ProfileSampleEntity)
  @JoinColumn({ name: 'sampleId' })
  sample: ProfileSampleEntity;
}