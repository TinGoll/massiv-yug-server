import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { DocumentEntity } from '../../order/entities/document.entity';
import { ProfileSampleEntity } from './sample-profile.entity';

@Entity('document_profiles')
export class DocumentProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array')
  widths: number[];

  @Column('enum', { enum: ['90°', '45°'], nullable: true })
  angle: '90°' | '45°';
  
  @Column({type: "varchar", nullable: true, length: 512})
  note: string;

  @ManyToOne((type) => ProfileSampleEntity, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'sampleId' })
  sample: ProfileSampleEntity;

  @OneToOne(() => DocumentEntity, (document) => document.profile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'documentId' })
  document: DocumentEntity;
}
