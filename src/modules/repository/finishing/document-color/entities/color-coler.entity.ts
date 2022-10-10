import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ColorConverterEntity } from "./color-converter.entity";



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