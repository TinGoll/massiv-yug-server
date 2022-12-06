import {
  BookDocumentType,
  DocumentGlossiness,
} from 'src/core/@types/app.types';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SampleMaterialEntity } from '../../material/entities/sample.material.entity';
import { BookEntity } from './book.entity';
import { DocumentColorEntity } from './document.color.entity';
import { ElementEntity } from './document.element.entity';
import { DocumentPanelEntity } from './document.panel.entity';
import { DocumentPatinaEntity } from './document.patina.entity';
import { DocumentProfileEntity } from './document.profile.entity';
import { DocumentVarnishEntity } from './document.varnish.entity';

interface DocumentResultData {}

@Entity('order_documents')
export class DocumentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /** Дата создания */
  @CreateDateColumn()
  createdAt: Date;

  /** Дата изменения */
  @UpdateDateColumn()
  updatedAt: Date;

  /** Отметка об удалении */
  @Column('boolean', { default: false })
  deleted: boolean;

  @Column({ type: 'varchar', length: 64, nullable: true })
  documentType: BookDocumentType;

  /** Глянцевость. */
  @Column({
    type: 'enum',
    enum: [
      'Глубоко матовый (10%)',
      'Матовый (20%)',
      'Лёгкий глянец (40%)',
      'Глянец (70%)',
      'Сильный глянец (90%)',
    ],
    nullable: true,
  })
  glossiness: DocumentGlossiness;

  @Column({ type: 'jsonb', default: {} })
  resultData: DocumentResultData;

  /** Комментарий / примечание */
  @Column({ type: 'varchar', length: 512, nullable: true })
  note: string;

  @Column({ type: 'float', default: 0 })
  cost: number;

  @ManyToOne(() => SampleMaterialEntity, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'materialId' })
  /** Основной материал документа */
  material: SampleMaterialEntity;

  @ManyToOne(() => DocumentPanelEntity, (panel) => panel.document, {
    eager: true,
    onDelete: 'SET NULL',
  })
  /** Филёнка документа. */
  panel: DocumentPanelEntity;

  @OneToOne(() => DocumentProfileEntity, (profile) => profile.document, {
    eager: true,
    onDelete: 'SET NULL',
  })
  /** Модель профиля документа */
  profile: DocumentProfileEntity;

  @OneToOne(() => DocumentColorEntity, (color) => color.document, {
    eager: true,
  })
  /** Цвет документа */
  color: DocumentColorEntity;

  @OneToOne(() => DocumentPatinaEntity, (patina) => patina.document, {
    eager: true,
  })
  /** Патина документа */
  patina: DocumentPatinaEntity;

  @OneToOne(() => DocumentVarnishEntity, (varnish) => varnish.document, {
    eager: true,
  })
  /** Лак документа */
  varnish: DocumentVarnishEntity;

  /** Книга документа */
  @ManyToOne(() => BookEntity, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  @JoinColumn({
    name: 'bookId',
  })
  book: Promise<BookEntity>;

  /** Документы книги */
  @OneToMany(() => ElementEntity, (element) => element.document, {
    eager: true,
  })
  elements: ElementEntity[];
}
