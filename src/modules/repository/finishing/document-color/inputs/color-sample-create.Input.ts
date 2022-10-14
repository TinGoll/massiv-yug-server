import { ColorType } from "src/core/types/model-types/color-types";
import { ConverterCreateInput } from "./converter-create.input";


export class ColorCreateSampleInput {
  name: string;
  colorType: ColorType;
  converters?: ConverterCreateInput[];
}