import { PatinaType } from 'src/core/types/model-types/patina-types';
import { DocumentEntity } from 'src/modules/repository/order/entities/document.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { PatinaConverterEntity } from './converter-patina.entity';

@Entity('patina_samples')
export class PatinaSampleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column('enum', {
    enum: ['Однокомпонентная', 'Многокомпонентная'],
  })
  type: PatinaType;

  @Column('boolean', { default: false })
  deleted: boolean;

  @OneToMany(() => PatinaConverterEntity, (converter) => converter.sample, {
    eager: true,
  })
  converters: PatinaConverterEntity[];
}


