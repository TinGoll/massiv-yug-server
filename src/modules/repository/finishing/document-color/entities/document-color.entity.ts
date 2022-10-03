import {
  ColorConverterGloss,
  ColorType,
  ConverterTransparency,
  TypeColorConverter,
} from 'src/core/types/model-types/color-types';
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

// **********************************************************************

/** Шаблон цвета */
@Entity('color_samples')
export class ColorSampleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column('enum', { enum: ['Эмаль', 'Морилка'], nullable: true })
  colorType: ColorType;

  @Column('boolean', { default: false })
  deleted: boolean;

  @OneToMany(() => ColorConverterEntity, (converter) => converter.sample, {
    eager: true,
  })
  converters: ColorConverterEntity[];
}

// **********************************************************************

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

// **********************************************************************

/** Колер конвертера */
@Entity('color_converter_colers')
export class ColorConverterColerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column('numeric', { default: 0 })
  value: number;

  @ManyToOne(() => ColorConverterEntity, {
    onDelete: "CASCADE"
  })
  @JoinColumn({
    name: 'converterId',
  })
  converter: ColorConverterEntity;
}

/** Цвет документа */
@Entity('document_colors')
export class DocumentColorEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  // documentId: number;

  @Column('numeric', { default: 0 })
  value: number;

  @Column()
  converterId: number;

  

  @Column('json', { default: { converterAmount: 0, colerAmounts: [] } })
  data: {
    converterAmount: number;
    colerAmounts: Array<{ colerName: string; amount: number }>;
  };

  @ManyToOne((type) => ColorSampleEntity)
  @JoinColumn({ name: 'sampleId' })
  sample: ColorSampleEntity;


}
