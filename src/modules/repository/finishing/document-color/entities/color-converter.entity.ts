import { TypeColorConverter, ColorConverterGloss, ConverterTransparency } from "src/core/types/model-types/color-types";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { ColorConverterColerEntity } from "./color-coler.entity";
import { ColorSampleEntity } from "./sample-color.entity";



/** Конвертер цвета */
@Entity('color_converters')
export class ColorConverterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column('enum', { enum: ['Акрил', 'Полиуретан'], nullable: true })
  typeConverter: TypeColorConverter;

  @Column('enum', { enum: ['20%', '40%', '70%'], nullable: true })
  converterGloss: ColorConverterGloss;

  @Column('enum', { enum: ['Прозрачный', 'Белый'], nullable: true })
  transparency: ConverterTransparency;

  @Column('numeric', { default: 0 })
  value: number;

  @Column('boolean', { default: false })
  deleted: boolean;

  @ManyToOne(() => ColorSampleEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'sampleId',
  })
  sample: ColorSampleEntity;

  @OneToMany(() => ColorConverterColerEntity, (coler) => coler.converter, {
    eager: true,
  })
  colers: ColorConverterColerEntity[];
}
