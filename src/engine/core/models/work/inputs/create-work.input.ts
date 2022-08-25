import { Field, InputType } from "@nestjs/graphql";
import { Unit } from "src/engine/core/@types/other-types";

@InputType()
export class CreateWorkInput {
  @Field({ nullable: false })
  name: string;
  @Field({ nullable: false })
  unit: Unit;
//   @Field()
//   price: number;
//   @Field()
//   cost: number;
//   @Field()
//   norm: number;
//   @Field()
//   dateBeginning: Date;
//   @Field()
//   dateEnd: Date;
}