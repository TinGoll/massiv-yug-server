import {
  ColorConverterGloss,
  ConverterTransparency,
  TypeColorConverter,
} from 'src/core/types/model-types/color-types';
import { ColorColer } from './color.coler.model';

export class ColorConverter {
  id: number = 0;
  colorSampleId: number;

  name: string;
  typeConverter: TypeColorConverter;
  converterGloss: ColorConverterGloss;
  transparency: ConverterTransparency;
  value: number = 0;
  colers: ColorColer[] = [];
  deleted: boolean = false;
}


export class ColorConverterCreateInput {
  colorSampleId: number;
  name: string;
  typeConverter?: TypeColorConverter;
  converterGloss?: ColorConverterGloss;
  transparency?: ConverterTransparency;
  value?: number;
  colers?: ColorColer[];
}

export class ColorConverterUpdateInput {
  colorSampleId?: number;
  name?: string;
  typeConverter?: TypeColorConverter;
  converterGloss?: ColorConverterGloss;
  transparency?: ConverterTransparency;
  value?: number;
  colers?: ColorColer[];
  deleted?: boolean;
}