import { Field, InputType } from "@nestjs/graphql";
import { ColorConverterGloss, ConverterTransparency, TypeColorConverter } from "src/engine/core/@types/color-types";



@InputType()
export class CreateConverterInput {
  @Field({ nullable: true })
  value: number;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: true })
  typeConverter: TypeColorConverter;

  @Field({ nullable: true })
  converterGloss: ColorConverterGloss;

  @Field({ nullable: true })
  transparency: ConverterTransparency;
}