import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ConverterEntity } from './converter.entity';

@ObjectType()
@Entity('colers')
export class ColerEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ type: 'numeric', precision: 10, scale: 3 })
  value: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  
  @ManyToOne(() => ConverterEntity, (converter) => converter.colers)
  converter: ConverterEntity;
}
