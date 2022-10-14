import { DocumentEntity } from "src/modules/repository/order/entities/document.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { ColorSampleEntity } from "./sample-color.entity";


/** Цвет документа */
@Entity('document_colors')
export class DocumentColorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('numeric', { default: 0 })
  value: number;

  @Column()
  converterId: number;

  @Column('jsonb', { default: { converterAmount: 0, colerAmounts: [] } })
  data: {
    converterAmount: number;
    colerAmounts: Array<{ colerName: string; amount: number }>;
  };

  /** Название из старой бд */
  @Column({ type: 'varchar', length: 256, nullable: true })
  previousName?: string;

  @ManyToOne((sample) => ColorSampleEntity, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'sampleId' })
  sample: ColorSampleEntity;

  // Подключение документа
  @OneToOne(() => DocumentEntity, (document) => document.color, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'documentId' })
  document: DocumentEntity;
}