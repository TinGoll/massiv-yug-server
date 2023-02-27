import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { DocumentEntity } from './document.entity';
import {
  ComponentKey,
  ElementSampleBody,
  SampleElementEntity,
} from './element.entity';

export interface ComponentData<T extends object = object> {
  /** Название компонента */
  componentName: ComponentKey;
  /** Обеъект с полями компонента. */
  data: object | null;
}

/** Сущность */
@Entity('order_document_elements')
export class ElementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 256, nullable: true })
  note: string;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column({ type: 'jsonb', default: [] })
  components: ComponentData[];

  @Column({ type: 'jsonb', default: null })
  identifier: ElementSampleBody | null;

  @ManyToOne(() => DocumentEntity, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  @JoinColumn({
    name: 'documentId',
  })
  /** Документ */
  document: Promise<DocumentEntity>;

  @ManyToOne((sample) => SampleElementEntity, {
    onDelete: 'SET NULL',
    lazy: true,
  })
  @JoinColumn({ name: 'sampleId' })
  /** Шаблон элемента */
  sample: SampleElementEntity | Promise<SampleElementEntity>;
}
