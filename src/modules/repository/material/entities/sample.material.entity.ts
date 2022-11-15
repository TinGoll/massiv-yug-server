import { MaterialType } from 'src/core/@types/app.types';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sample_materials')
export class SampleMaterialEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column('enum', {
    enum: [
      'Массив твердый',
      'Массив мягкий',
      'МДФ',
      'Полиуретан',
      'ЛДСП',
      'ДСП',
    ] as MaterialType[],
    nullable: true,
  })
  type: MaterialType;

  @Column('boolean', { default: false })
  deleted: boolean;
}
