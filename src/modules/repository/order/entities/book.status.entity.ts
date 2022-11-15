import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('book_statuses')
export class BookStatusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128 })
  name: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  index: number;
}
