
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { PatinaConverterEntity } from '../../patina/entities/patina.converters.entity';
import { SamplePatinaEntity } from '../../patina/entities/sample.patina.entity';
import { DocumentEntity } from './document.entity';


@Entity('order_document_patina')
export class DocumentPatinaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('numeric', { default: 0 })
  value: number;

  /** Название из старой бд */
  @Column({ type: 'varchar', length: 256, nullable: true })
  previousName?: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  note: string;

  @ManyToOne((conv) => PatinaConverterEntity, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'converterId' })
  /** Текущий конвертер */
  converter: PatinaConverterEntity;

  @ManyToOne((type) => SamplePatinaEntity, { onDelete: 'SET NULL', eager: true })
  @JoinColumn({ name: 'sampleId' })
  sample: SamplePatinaEntity;

  // Подключение документа
  @OneToOne(() => DocumentEntity, (document) => document.patina, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'documentId' })
  document: DocumentEntity;
}
