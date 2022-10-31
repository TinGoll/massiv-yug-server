import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, Column } from "typeorm";
import { ColorSampleEntity } from "../../finishing/document-color/entities/sample-color.entity";
import { MaterialSampleEntity } from "../../material/entities/sample-material.entity";
import { DocumentEntity } from "../../order/entities/document.entity";
import { PanelSampleEntity } from "./sample-panel.entity";


@Entity('document_panel')
export class DocumentPanelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 512, nullable: true })
  note: string;

  @ManyToOne((type) => ColorSampleEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'colorId' })
  color: ColorSampleEntity;

  @ManyToOne((type) => MaterialSampleEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'materialId' })
  material: MaterialSampleEntity;

  @ManyToOne((type) => PanelSampleEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'sampleId' })
  sample: PanelSampleEntity;

  // Подключение документа
  @OneToOne(() => DocumentEntity, (document) => document.color, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'documentId' })
  document: DocumentEntity;
}
