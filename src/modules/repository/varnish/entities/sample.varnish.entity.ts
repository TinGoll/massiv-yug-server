import { VarnishType, VarnishGlossiness } from 'src/core/@types/app.types';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sample_varnish')
export class SampleVarnishEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column('enum', {
    enum: ['Акриловый', 'Полиуретановый'] as VarnishType[],
    nullable: true,
  })
  type: VarnishType;

  @Column('enum', {
    enum: ['10%', '20%', '40%', '70%', '90%'] as VarnishGlossiness[],
    nullable: true,
  })
  glossiness: VarnishGlossiness;

  @Column('boolean', { default: false })
  deleted: boolean;
}
