import { TypeColorConverter, ColorConverterGloss, ConverterTransparency } from "src/core/types/model-types/color-types";
import { ColerCreateInput } from "./coler-create.input";

export class ConverterCreateInput {

  name: string;

  typeConverter: TypeColorConverter;

  converterGloss: ColorConverterGloss;

  transparency: ConverterTransparency;

  value: number;

  sampleId: number;

  colers?: ColerCreateInput[] = [];

}