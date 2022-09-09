import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateColerInput } from './create-coler.input';

@InputType()
export class UpdateColerInput extends PartialType(CreateColerInput) {
  @Field(() => ID, { nullable: false })
  id: number;
}
