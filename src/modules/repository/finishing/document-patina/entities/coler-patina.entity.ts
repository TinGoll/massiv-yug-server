import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { PatinaConverterEntity } from "./converter-patina.entity";


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