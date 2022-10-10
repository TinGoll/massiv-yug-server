import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { VarnishSampleEntity } from "../../finishing/document-varnish/entities/sample-varnish.entity";
import { DocumentEntity } from "../../order/entities/document.entity";


@Entity('document_material')
export class DocumentMaterialEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('numeric', { default: 0 })
  value: number;

  @ManyToOne((type) => VarnishSampleEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'sampleId' })
  sample: VarnishSampleEntity;

  sampleId: number;

  // Подключение документа
  @OneToOne(() => DocumentEntity, (document) => document.color, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'documentId' })
  document: DocumentEntity;

  documentId: number;
}
