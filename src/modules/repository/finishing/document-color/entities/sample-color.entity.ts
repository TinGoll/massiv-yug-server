import {
  ColorType,
} from 'src/core/types/model-types/color-types';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ColorConverterEntity } from './color-converter.entity';

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



