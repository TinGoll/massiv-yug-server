import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { DocumentEntity } from "../../order/entities/document.entity";
import { PanelSampleEntity } from "./sample-panel.entity";


@Entity('document_panel')
export class DocumentPanelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => PanelSampleEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'sampleId' })
  sample: PanelSampleEntity;

  sampleId: number;

  // Подключение документа
  @OneToOne(() => DocumentEntity, (document) => document.color, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'documentId' })
  document: DocumentEntity;
  documentId: number;
}
