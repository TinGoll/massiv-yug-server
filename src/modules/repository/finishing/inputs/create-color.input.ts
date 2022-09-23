
import { Field, InputType } from '@nestjs/graphql';
import { ColorType } from 'src/core/types/model-types/color-types';


@InputType()
export class CreateColorInput {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  colorType: ColorType;
}