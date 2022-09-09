import { InputType, Field } from '@nestjs/graphql';
import { Unit } from 'src/engine/core/@types/other-types';




@InputType()
export class CreateWorkInput {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: true })
  unit: Unit;

  @Field({ nullable: true })
  price: number;

  @Field({ nullable: true })
  cost: number;

  @Field({ nullable: true })
  norm: number;

  @Field({ nullable: true })
  dateBeginning: Date;

  @Field({ nullable: true })
  dateEnd: Date;
}