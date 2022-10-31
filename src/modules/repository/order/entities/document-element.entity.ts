import { ComponentKey } from "src/modules/ecs/services/component-mapper";
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, Column } from "typeorm";
import { GeometryComponentEntity } from "../../component-data/geometry-component.entity";
import { NoteComponentEntity } from "../../component-data/note-component.entity";
import { DocumentEntity } from "./document.entity";
import { ElementSampleEntity } from "./sample-element.entity";



/** Сущность */
@Entity('document_element')
export class ElementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  /** Документ */
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

  @Column({ type: 'jsonb', default: [] })
  components: Array<{
    componentName: ComponentKey;
    data: object;
  }>;

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