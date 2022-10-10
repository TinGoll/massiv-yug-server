import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity('book_statuses')
export class BookStatusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128 })
  name: string;

  @Column({ type: 'numeric' })
  index: number;
}
