import { DocumentEntity } from 'src/modules/repository/order/entities/document.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { VarnishSampleEntity } from './sample-varnish.entity';

@Entity('document_varnish')
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

  @ManyToOne((type) => VarnishSampleEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'sampleId' })
  sample: VarnishSampleEntity;

  // Подключение документа
  @OneToOne(() => DocumentEntity, (document) => document.color, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'documentId' })
  document: DocumentEntity;
}
