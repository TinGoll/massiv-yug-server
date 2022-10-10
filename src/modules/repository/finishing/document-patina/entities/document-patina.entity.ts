import { DocumentEntity } from "src/modules/repository/order/entities/document.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { PatinaSampleEntity } from "./sample-patina.entity";


@Entity('document_patinas')
export class DocumentPatinaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('numeric', { default: 0 })
  value: number;

  @Column()
  converterId: number;

  @ManyToOne((type) => PatinaSampleEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'sampleId' })
  sample: PatinaSampleEntity;

  // Подключение документа
  @OneToOne(() => DocumentEntity, (document) => document.color, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'documentId' })
  document: DocumentEntity;
}
