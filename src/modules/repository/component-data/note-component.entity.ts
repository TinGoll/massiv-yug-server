import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from "typeorm";
import { ElementEntity } from "../order/entities/document-element.entity";


@Entity('component_note')
export class NoteComponentEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 512 })
  note: string;

  /** Елемент, сущность документа */
  @OneToOne(() => ElementEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'elementId' })
  element: ElementEntity;
}