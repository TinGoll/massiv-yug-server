import { ColorType } from 'src/core/types/model-types/color-types';
import { ConverterEntity } from './converter.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@ObjectType()
@Entity('colors')
export class ColorEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => ID)
  @Column({ nullable: true, type: 'int4' })
  currentConverterId: number;

  @Field()
  @Column({ type: 'varchar', length: 128, nullable: false })
  name: string;

  @Field()
  @Column({ type: 'enum', enum: ['Эмаль', 'Морилка'], nullable: true })
  colorType: ColorType;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => ConverterEntity, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  currentConverter: ConverterEntity;

  @OneToMany(() => ConverterEntity, (converter) => converter.color, {
    eager: true,
    onDelete: 'CASCADE',
  })
  converters: ConverterEntity[];
}
