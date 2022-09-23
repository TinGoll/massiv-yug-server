import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Unit } from 'src/core/types/model-types/other-types';

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('works')
export class WorkEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field({ nullable: false })
  @Column({ nullable: false })
  name: string;

  @Field({ nullable: false })
  @Column({ nullable: false })
  unit: Unit;

  @Field()
  @Column({ default: 0 })
  price: number;

  @Field()
  @Column({ default: 0 })
  cost: number;

  @Field()
  @Column({ default: 0 })
  @Field()
  norm: number;

  @Field()
  @Column()
  dateBeginning: Date;
  
  @Field()
  @Column()
  dateEnd: Date;
}
