import { PatinaType } from 'src/core/types/model-types/patina-types';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

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

/** Конвертер патины */
@Entity('patina_converters')
export class PatinaConverterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column('numeric', { default: 0 })
  value: number;

  @ManyToOne(() => PatinaSampleEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sampleId' })
  sample: PatinaSampleEntity;

  @OneToMany(() => PatinaConverterColerEntity, (coler) => coler.converter, {
    eager: true,
  })
  colers: PatinaConverterColerEntity[];
}

/** колер конвертера патины */
@Entity('patina_converter_colers')
export class PatinaConverterColerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column("numeric", { default: 0 })
  value: number;

  @ManyToOne(() => PatinaConverterEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'converterId',
  })
  converter: PatinaConverterEntity;
}

@Entity('document_patinas')
export class DocumentPatinaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('numeric', { default: 0 })
  value: number;

  @Column()
  converterId: number;

  @ManyToOne((type) => PatinaSampleEntity)
  @JoinColumn({ name: 'sampleId' })
  sample: PatinaSampleEntity;
}
