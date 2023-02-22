import { PersonEntity } from 'src/modules/person/entities/person.entity';
import { BookEntity } from 'src/modules/repository/order/entities/book.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';

export type HistoryOperation =
  | 'open'
  | 'create'
  | 'close'
  | 'update'
  | 'delete';

@Entity('book_history')
export class HistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;
  /** Дата создания */
  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'varchar', length: 128, nullable: false })
  operation: HistoryOperation;

  @Column({ type: 'varchar', length: 256, nullable: false })
  label: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  description: string;

  @ManyToOne((type) => BookEntity, {
    lazy: false,
    eager: false,
    onDelete: 'SET NULL',
  })
  book: BookEntity;

  @ManyToOne((type) => PersonEntity, {
    lazy: false,
    eager: false,
    onDelete: 'SET NULL',
  })
  user: PersonEntity;
}
