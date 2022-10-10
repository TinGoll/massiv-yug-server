import {
  TypeColorConverter,
  ColorConverterGloss,
  ConverterTransparency,
} from 'src/core/types/model-types/color-types';

export class ConverterUpdateInput {
  id: number;

  name?: string;

  typeConverter?: TypeColorConverter;

  converterGloss?: ColorConverterGloss;

  transparency?: ConverterTransparency;

  value?: number;
}
