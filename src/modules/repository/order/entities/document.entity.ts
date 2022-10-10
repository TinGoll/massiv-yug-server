import {
  Entity,
  JoinColumn,
  OneToOne,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import {
  BookDocumentType,
  DocumentGlossiness,
} from 'src/core/types/model-types/document-types';

import { BookEntity, СommonOrderData } from './book.entity';
import { ElementEntity } from './element.entity';
import { DocumentColorEntity } from '../../finishing/document-color/entities/document-color.entity';
import { DocumentPatinaEntity } from '../../finishing/document-patina/entities/document-patina.entity';
import { DocumentVarnishEntity } from '../../finishing/document-varnish/entities/document-varnish.entity';

import { DocumentMaterialEntity } from '../../material/entities/document-material.entity';
import { DocumentPanelEntity } from '../../panel/entities/document-panel.entity';
import { DocumentProfileEntity } from '../../profile/entities/document-profile.entity';

@Entity('documents')
export class DocumentEntity extends СommonOrderData {
  @Column({ type: 'varchar', length: 64 })
  documentType: BookDocumentType;

  @OneToOne(() => DocumentPanelEntity, (panel) => panel.document, {
    eager: true,
  })
  panel: DocumentPanelEntity;

  @OneToOne(() => DocumentMaterialEntity, (material) => material.document, {
    eager: true,
  })
  material: DocumentMaterialEntity;

  @OneToOne(() => DocumentProfileEntity, (profile) => profile.document, {
    eager: true,
  })
  profile: DocumentProfileEntity;

  @OneToOne(() => DocumentColorEntity, (color) => color.document, {
    eager: true,
  })
  color: DocumentColorEntity;

  @OneToOne(() => DocumentPatinaEntity, (patina) => patina.document, {
    eager: true,
  })
  patina: DocumentPatinaEntity;

  @OneToOne(() => DocumentVarnishEntity, (varnish) => varnish.document, {
    eager: true,
  })
  varnish: DocumentVarnishEntity;

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
  })
  glossiness: DocumentGlossiness;

  @Column({ type: 'jsonb', default: {} })
  resultData: any;

  /** Комментарий / примечание */
  @Column({ type: 'varchar', length: 512 })
  note: string;

  /** Книга документа */
  @ManyToOne(() => BookEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'bookId',
  })
  book: BookEntity;

  /** Документы книги */
  @OneToMany(() => ElementEntity, (element) => element.document, {
    eager: true,
  })
  elements: ElementEntity[];
}
