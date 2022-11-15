import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { PatinaConverterColerEntity } from './patina.converter.coler';
import { SamplePatinaEntity } from './sample.patina.entity';

/** Конвертер патины */
@Entity('patina_converters')
export class PatinaConverterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column('numeric', { default: 0 })
  value: number;

  @Column('boolean', { default: false })
  deleted: boolean;

  @ManyToOne(() => SamplePatinaEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sampleId' })
  sample: SamplePatinaEntity;

  @OneToMany(() => PatinaConverterColerEntity, (coler) => coler.converter, {
    eager: true,
  })
  colers: PatinaConverterColerEntity[];
}
