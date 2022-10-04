import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { DocumentEntity } from '../../order/entities/document.entity';

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

  /** Проверить работу массива */
  @Column('simple-array', { default: [0, 0, 0, 0] })
  widths: number[];

  @Column({ type: 'varchar', length: 560 })
  drawing: string;

  /** Отметка об удалении */
  @Column('boolean', { default: false })
  deleted: boolean;
}

@Entity('document_profiles')
export class DocumentProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array')
  widths: number[];

  @Column('enum', { enum: ['90°', '45°'], nullable: true })
  angle: '90°' | '45°';

  @ManyToOne((type) => ProfileSampleEntity, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'sampleId' })
  sample: ProfileSampleEntity;

  @OneToOne(() => DocumentEntity, (document) => document.profile, { onDelete: "CASCADE"})
  @JoinColumn({ name: "documentId"})
  document: DocumentEntity;
}
