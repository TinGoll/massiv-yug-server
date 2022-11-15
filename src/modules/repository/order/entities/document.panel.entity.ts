import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  Column,
} from 'typeorm';
import { SampleColorEntity } from '../../color/entities/sample.color.entity';
import { SampleMaterialEntity } from '../../material/entities/sample.material.entity';
import { SamplePanelEntity } from '../../panel/entities/sample.panel.entity';
import { DocumentEntity } from './document.entity';


@Entity('order_document_panel')
export class DocumentPanelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 512, nullable: true })
  note: string;

  @ManyToOne((type) => SampleColorEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'colorId' })
  color: SampleColorEntity;

  @ManyToOne((type) => SampleMaterialEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'materialId' })
  material: SampleMaterialEntity;

  @ManyToOne((type) => SamplePanelEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'sampleId' })
  sample: SamplePanelEntity;

  // Подключение документа
  @OneToOne(() => DocumentEntity, (document) => document.panel, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'documentId' })
  document: DocumentEntity;
}
