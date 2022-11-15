import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ColorConverterEntity } from '../../color/entities/color.converter.entity';
import { SampleColorEntity } from '../../color/entities/sample.color.entity';
import { DocumentEntity } from './document.entity';


interface DocumentColorData {
  converterAmount: number;
  colerAmounts: Array<{ colerName: string; amount: number }>;
}

/** Цвет документа */
@Entity('order_document_color')
export class DocumentColorEntity {
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column('numeric', { default: 0 })
  value: number;

  @Column({ type: 'varchar', length: 512, nullable: true })
  note: string;

  @Column('jsonb', { default: { converterAmount: 0, colerAmounts: [] } })
  data: DocumentColorData;

  /** Название из старой бд */
  @Column({ type: 'varchar', length: 256, nullable: true })
  previousName?: string;

  @ManyToOne((conv) => ColorConverterEntity, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'converterId' })
  /** Текущий конвертер */
  converter: ColorConverterEntity;

  @ManyToOne((sample) => SampleColorEntity, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'sampleId' })
  /** Шаблон цвета */
  sample: SampleColorEntity;

  // Подключение документа
  @OneToOne(() => DocumentEntity, (document) => document.color, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'documentId' })
  document: DocumentEntity;
}
