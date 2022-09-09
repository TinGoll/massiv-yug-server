// export declare module IColor {
//   export interface Coler {
//     name: string;
//     value: number;
//   }

import { ColorConverterGloss, ColorType, ConverterTransparency, TypeColorConverter } from "src/engine/core/@types/color-types";

//   export interface Converter {
//     value: number;
//     colers: Coler[];
//     name: string;
//     typeConverter: string;
//     converterGloss: string;
//     transparency: string;
//   }

//   export interface Color {
//     converters: Converter[];
//     currentConverter?: any;
//     name: string;
//     colorType: string;
//   }
// }

export interface ColorDto {
  converters: ColorConverterDto[];
  currentConverter?: any;
  name: string;
  colorType: ColorType;
}

export interface ColorConverterDto {
  value: number;
  colers: ColorColerDto[];
  name: string;
  typeConverter: TypeColorConverter;
  converterGloss: ColorConverterGloss;
  transparency: ConverterTransparency;
}

export interface ColorColerDto {
  name: string;
  value: number;
}
