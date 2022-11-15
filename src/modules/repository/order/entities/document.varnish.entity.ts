
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { SampleVarnishEntity } from '../../varnish/entities/sample.varnish.entity';
import { DocumentEntity } from './document.entity';

@Entity('order_document_varnish')
export class DocumentVarnishEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('numeric', { default: 0 })
  value: number;

  /** Название из старой бд */
  @Column({ type: 'varchar', length: 256, nullable: true })
  previousName?: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  note: string;

  @ManyToOne((type) => SampleVarnishEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'sampleId' })
  sample: SampleVarnishEntity;

  // Подключение документа
  @OneToOne(() => DocumentEntity, (document) => document.varnish, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'documentId' })
  document: DocumentEntity;
}
