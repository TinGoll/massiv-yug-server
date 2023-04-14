import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { SampleWorkEntity } from '../../work/entities/sample.work.entity';
import { DocumentEntity } from '../../order/entities/document.entity';
import { WorkKey } from '../../work/inputs/work.input';
import { Fields } from 'src/core/@types/app.types';

export interface Blank {
  indices: number[];
  header: Fields<DocumentFields> | boolean;
}

type DocumentFields = Partial<
  Omit<
    DocumentEntity,
    | 'id'
    | 'book'
    | 'elements'
    | 'resultData'
    | 'note'
    | 'cost'
    | 'documentType'
    | 'updatedAt'
    | 'createdAt'
    | 'deleted'
  >
>;

@Entity('sectors')
export class SectorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column({ type: 'float', default: 0 })
  sectorLoad: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  orderBy: number;

  @Column({ type: 'jsonb', default: [] })
  blanks: Blank[];

  @Column('boolean', { default: false })
  deleted: boolean;

  @ManyToMany(() => SampleWorkEntity, (work) => work.sectors)
  works: SampleWorkEntity[];
}
