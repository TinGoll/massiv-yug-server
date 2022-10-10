import {
  VarnishGlossiness,
  VarnishType,
} from 'src/core/types/model-types/varnish-type';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,

} from 'typeorm';

@Entity('varnish_sample')
export class VarnishSampleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column('enum', { enum: ['Акриловый', 'Полиуретановый'], nullable: true })
  type: VarnishType;

  @Column('enum', {
    enum: ['10%', '20%', '40%', '70%', '90%'],
    nullable: true,
  })
  glossiness: VarnishGlossiness;

  @Column('boolean', { default: false })
  deleted: boolean;
}

