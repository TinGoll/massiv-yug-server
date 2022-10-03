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
  ManyToOne,
  OneToMany,
  JoinColumn,
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

  /**
   * @Column('enum', { enum: ['20%', '40%', '70%'], nullable: true })
   */

  @Column('enum', {
    enum: ['10%', '20%', '40%', '70%', '90%'],
    nullable: true,
  })
  glossiness: VarnishGlossiness;

  @Column('boolean', { default: false })
  deleted: boolean;
}

@Entity('document_varnish')
export class DocumentVarnishEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column('numeric', { default: 0 })
  value: number;

  @ManyToOne((type) => VarnishSampleEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'sampleId', })
  sample: VarnishSampleEntity;
}
