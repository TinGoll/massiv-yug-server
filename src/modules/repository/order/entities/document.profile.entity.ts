import { SplicingAngle } from 'src/core/@types/app.types';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { SampleProfileEntity } from '../../profile/entities/sample.profile.entity';
import { DocumentEntity } from './document.entity';




@Entity('order_document_profile')
export class DocumentProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array')
  widths: number[];

  @Column('enum', { enum: ['90°', '45°'] as SplicingAngle[], nullable: true })
  angle: SplicingAngle;

  @Column({ type: 'varchar', nullable: true, length: 512 })
  note: string;

  @ManyToOne((type) => SampleProfileEntity, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'sampleId' })
  sample: SampleProfileEntity;

  @OneToOne(() => DocumentEntity, (document) => document.profile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'documentId' })
  document: DocumentEntity;
}
