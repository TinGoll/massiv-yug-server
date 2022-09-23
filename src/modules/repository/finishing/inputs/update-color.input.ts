import { Field, ID, InputType } from '@nestjs/graphql';
import { ColorType } from 'src/core/types/model-types/color-types';


@InputType()
export class UpdateColorInput {
    
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  colorType: ColorType;
}
