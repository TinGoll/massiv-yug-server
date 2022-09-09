import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateColerInput {
  @Field({ nullable: false })
  name: string;
  @Field({ nullable: true })
  value: number;
}
