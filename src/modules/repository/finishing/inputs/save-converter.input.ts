import { InputType, Field, ID } from "@nestjs/graphql";
import { TypeColorConverter, ColorConverterGloss, ConverterTransparency } from "src/core/types/model-types/color-types";

@InputType()
export class SaveConverterInput {
  @Field(() => ID, { nullable: false })
  id: number;

  @Field({ nullable: true })
  value: number;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  typeConverter: TypeColorConverter;

  @Field({ nullable: true })
  converterGloss: ColorConverterGloss;

  @Field({ nullable: true })
  transparency: ConverterTransparency;

  
}