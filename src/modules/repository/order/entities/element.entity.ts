import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GeometryComponentEntity } from '../../component-data/geometry-component.entity';
import { NoteComponentEntity } from '../../component-data/note-component.entity';
import { DocumentEntity } from './document.entity';



/** Шаблон для сущности */
@Entity('element_sample')
export class ElementSampleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /** Название сущности */
  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column({type: "jsonb", default: []})
  components: string[]
}

/** Сущность */
@Entity('document_element')
export class ElementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /** Книга документа */
  @ManyToOne(() => DocumentEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'documentId',
  })
  document: DocumentEntity;


  @ManyToOne((sample) => ElementSampleEntity, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'sampleId' })
  sample: ElementSampleEntity;

  /******************************************** */
  /********* Подключение компонентов ********** */
  /******************************************** */

  @OneToOne(() => GeometryComponentEntity, (geometry) => geometry.element, {
    eager: true,
  }) // specify inverse side as a second parameter
  geometryComponent: GeometryComponentEntity;

  @OneToOne(() => NoteComponentEntity, (note) => note.element, {
    eager: true,
  }) // specify inverse side as a second parameter
  noteComponent: NoteComponentEntity;

  /******************************************** */
}
