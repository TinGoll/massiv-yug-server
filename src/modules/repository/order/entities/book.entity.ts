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
import { PersonEntity } from '../../person/entities/person.entity';
import { DocumentEntity } from './document.entity';

export class СommonOrderData {
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
}

@Entity('order_books')
export class BookEntity extends СommonOrderData {
  /** Номер / название клиента */
  @Column({ type: 'varchar', length: 512 })
  nameFromClient: string;

  /** Комментарий / примечание */
  @Column({ type: 'varchar', length: 512 })
  note: string;

  /** Штрих код */
  @Column({ type: 'varchar', length: 128 })
  barcode: string;

  /** Результативные данные */
  @Column({ type: 'jsonb', default: {} })
  resultData: any;

  @ManyToOne(() => PersonEntity, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'clientId' })
  client: PersonEntity;

  @ManyToOne(() => PersonEntity, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'authortId' })
  author: PersonEntity;

  @ManyToOne(() => PersonEntity, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'statusId' })
  status: BookStatusEntity;

  /** Документы книги */
  @OneToMany(() => DocumentEntity, (document) => document.book, {
    eager: true,
  })
  documents: DocumentEntity[];
}

@Entity('book_statuses')
export class BookStatusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128 })
  name: string;

  @Column({ type: 'numeric' })
  index: number;
}
