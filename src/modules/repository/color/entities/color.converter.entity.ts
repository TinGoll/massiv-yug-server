import { SampleColorEntity } from './sample.color.entity';
import { ColorConverterColerEntity } from './converter.coler.entity';
import {
  TypeColorConverter,
  ColorConverterGloss,
  ConverterTransparency,
} from 'src/core/@types/app.types';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

/** Конвертер цвета */
@Entity('color_converters')
export class ColorConverterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column('enum', {
    enum: ['Акрил', 'Полиуретан'] as TypeColorConverter[],
    nullable: true,
  })
  typeConverter: TypeColorConverter;

  @Column('enum', {
    enum: ['20%', '40%', '70%'] as ColorConverterGloss[],
    nullable: true,
  })
  converterGloss: ColorConverterGloss;

  @Column('enum', {
    enum: ['Прозрачный', 'Белый'] as ConverterTransparency[],
    nullable: true,
  })
  transparency: ConverterTransparency;

  @Column('numeric', { default: 0 })
  value: number;

  @Column('boolean', { default: false })
  deleted: boolean;

  @ManyToOne(() => SampleColorEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'sampleId',
  })
  sample: SampleColorEntity;

  @OneToMany(() => ColorConverterColerEntity, (coler) => coler.converter, {
    eager: true,
  })
  colers: ColorConverterColerEntity[];
}
