import {
  BookDocumentType,
  BookResultData,
  WorkData,
} from 'src/core/@types/app.types';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { SampleWorkEntity } from '../../work/entities/sample.work.entity';
import { BookStatusEntity } from './book.status.entity';
import { DocumentEntity } from './document.entity';
import { PersonEntity } from 'src/modules/person/entities/person.entity';
import { HistoryEntity } from 'src/modules/order-processing/entities/history.entity';
import { BookState } from './book.state';
import SerializationOrderGraph from 'src/core/common/graph/serialization.graph';





export const BOOK_BARCODE_PREFIX: number = 22;

@Entity('order_books')
export class BookEntity {
  @PrimaryGeneratedColumn('identity')
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

  //Даник решил добавить тип еще и в книгу.
  @Column({ type: 'varchar', length: 64, nullable: true })
  documentType: BookDocumentType;

  /** Номер / название клиента */
  @Column({ type: 'varchar', length: 256, nullable: true })
  nameFromClient: string;

  /** Комментарий / примечание */
  @Column({ type: 'varchar', length: 512, nullable: true })
  note: string;

  /** Штрих код */
  @Column({ type: 'varchar', length: 128, nullable: true })
  barcode: string;

  /** Результативные данные */
  @Column({ type: 'jsonb', default: {} })
  resultData: BookResultData;

  /** Результативные данные */
  @Column({ type: 'jsonb', default: null, nullable: true })
  graph?: SerializationOrderGraph.Graph;

  @Column({ type: 'float', default: 0 })
  cost: number;

  @Column({ type: 'jsonb', default: [] })
  /** В заказ копируется все работы. */
  works: SampleWorkEntity[];

  @Column({
    type: 'enum',
    enum: BookState,
    default: BookState.EDITING,
    nullable: true,
  })
  state: BookState;

  @ManyToOne(() => PersonEntity, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'clientId' })
  client: PersonEntity;

  @ManyToOne(() => PersonEntity, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'authorId' })
  author: PersonEntity;

  @ManyToOne(() => BookStatusEntity, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'statusId' })
  status: BookStatusEntity;

  /** Документы книги */
  @OneToMany(() => DocumentEntity, (document) => document.book, {
    eager: true,
  })
  documents: DocumentEntity[];

  @OneToMany((type) => HistoryEntity, (history) => history.book, { lazy: true })
  history: HistoryEntity[] | Promise<HistoryEntity[]>;
}
