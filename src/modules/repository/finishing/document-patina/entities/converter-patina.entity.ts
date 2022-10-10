import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { PatinaConverterColerEntity } from "./coler-patina.entity";
import { PatinaSampleEntity } from "./sample-patina.entity";



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