// export declare module IColor {
//   export interface Coler {
//     name: string;
//     value: number;
//   }

import {
  ColorConverterGloss,
  ColorType,
  ConverterTransparency,
  TypeColorConverter,
} from "src/engine/core/@types/color-types";
import {
  ColorColer,
  ColorConverter,
} from "src/core/modeles/finishing/color/Color";

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
  id?: number;
  converters: ColorConverterDto[];
  currentConverter?: any;
  name: string;
  colorType: ColorType;
}

export interface ColorConverterDto {
  id?: number;
  value: number;
  colers: ColorColerDto[];
  name: string;
  typeConverter: TypeColorConverter;
  converterGloss: ColorConverterGloss;
  transparency: ConverterTransparency;
}

export interface ColorColerDto {
  id?: number;
  name: string;
  value: number;
}

export interface ColorDefiningDto {
  id: number;
  converters: ConverterDefiningDto[];
  currentConverter: ColorConverter | null;
  name: string;
  colorType: ColorType;
}

export interface ConverterDefiningDto {
  id: number;
  typeConverter: TypeColorConverter;
  converterGloss: ColorConverterGloss;
  name: string;
  value: number;
  colers: Array<ColerDefiningDto>;
  transparency: ConverterTransparency;
}

export interface ColerDefiningDto {
  id: number;
  name: string;
  value: number;
}
