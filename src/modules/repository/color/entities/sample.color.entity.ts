import { ColorType } from 'src/core/@types/app.types';
import { ColorConverterEntity } from './color.converter.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';

/** Шаблон цвета */
@Entity('sample_colors')
export class SampleColorEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column('enum', { enum: ['Эмаль', 'Морилка'] as ColorType[], nullable: true })
  colorType: ColorType;

  @Column('boolean', { default: false })
  deleted: boolean;

  @OneToMany(() => ColorConverterEntity, (converter) => converter.sample, {
    eager: true,
  })
  converters: ColorConverterEntity[];
}
