
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { DocumentEntity } from './document.entity';
import { SampleElementEntity } from './element.entity';


/** Сущность */
@Entity('order_document_elements')
export class ElementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column({ type: 'jsonb', default: [] })
  components: any;

  @ManyToOne(() => DocumentEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'documentId',
  })
  /** Документ */
  document: DocumentEntity;

  @ManyToOne((sample) => SampleElementEntity, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'sampleId' })
  /** Шаблон элемента */
  sample: SampleElementEntity;
}
