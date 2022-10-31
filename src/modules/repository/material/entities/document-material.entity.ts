import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { DocumentEntity } from "../../order/entities/document.entity";
import { MaterialSampleEntity } from "./sample-material.entity";


@Entity('document_material')
export class DocumentMaterialEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('numeric', { default: 0 })
  value: number;

  @ManyToOne((type) => MaterialSampleEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'sampleId' })
  sample: MaterialSampleEntity;

  // Подключение документа
  @OneToOne(() => DocumentEntity, (document) => document.color, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'documentId' })
  document: DocumentEntity;

  documentId: number;
}
