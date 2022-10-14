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
