import { MaterialType } from 'src/core/types/model-types/material-type';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity('material_sample')
export class MaterialSampleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column('enum', {
    enum: ['Массив твердый', 'Массив мягкий', 'МДФ'],
    nullable: true,
  })
  type: MaterialType;

  @Column('boolean', { default: false })
  deleted: boolean;
}


