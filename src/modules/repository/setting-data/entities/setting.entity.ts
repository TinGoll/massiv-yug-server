import { MaterialType } from 'src/core/types/model-types/material-type';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('setting_data')
export class SettingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'varchar', length: 512 })
  name: string;

  @Column({ type: 'jsonb', default: {} })
  value: object;
}
