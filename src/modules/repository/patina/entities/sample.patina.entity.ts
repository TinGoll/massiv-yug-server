import { PatinaType } from 'src/core/@types/app.types';
import { PatinaConverterEntity } from './patina.converters.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('sample_patinas')
export class SamplePatinaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column('enum', {
    enum: ['Однокомпонентная', 'Многокомпонентная'] as PatinaType[],
  })
  type: PatinaType;

  @Column('boolean', { default: false })
  deleted: boolean;

  @OneToMany(() => PatinaConverterEntity, (converter) => converter.sample, {
    eager: true,
  })
  converters: PatinaConverterEntity[];
}
