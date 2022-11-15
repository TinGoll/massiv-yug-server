import {
  ColorConverterGloss,
  ConverterTransparency,
  TypeColorConverter,
} from 'src/core/@types/app.types';
/** Набор полей необходимых для добавления конвертера */
export class ColorConverterCreateInput {
  name: string;
  typeConverter: TypeColorConverter;
  converterGloss?: ColorConverterGloss;
  transparency?: ConverterTransparency;
  value?: number;
}
/** Набор полей необходимых для обновления конвертера */
export class ColorConverterUpdateInput {
  id: number;
  name?: string;
  typeConverter?: TypeColorConverter;
  converterGloss?: ColorConverterGloss;
  transparency?: ConverterTransparency;
  value?: number;
}
