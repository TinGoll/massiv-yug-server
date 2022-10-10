import { DocumentEntity } from "src/modules/repository/order/entities/document.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { VarnishSampleEntity } from "./sample-varnish.entity";

@Entity('document_varnish')
export class DocumentVarnishEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('numeric', { default: 0 })
  value: number;

  @ManyToOne((type) => VarnishSampleEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'sampleId' })
  sample: VarnishSampleEntity;

  // Подключение документа
  @OneToOne(() => DocumentEntity, (document) => document.color, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'documentId' })
  document: DocumentEntity;
}
