import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateWorkInput } from './create-work.input';

@InputType()
export class UpdateWorkInput extends PartialType(CreateWorkInput) {
  @Field(() => ID)
  id: number;
}
