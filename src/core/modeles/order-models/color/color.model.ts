import { ColorType } from 'src/core/types/model-types/color-types';
import {
  ColorConverter,
  ColorConverterCreateInput,
  ColorConverterUpdateInput,
} from './color.converter.model';

/** Состояние для отображения на клиенте */
export interface DocumentColorState {
  id: number;
  sampleId: number;
  sample: ColorSample;
  converterId: number | null;
  converter: ColorConverter | null;
  documentId: number;
  value: number;
  data: {
    converterAmount: number;
    colerAmounts: Array<{ colerName: string; amount: number }>;
  };
}

export class ColorSample {
  id: number = 0;
  name: string;
  colorType: ColorType;
  converterSamples: ColorConverter[] = [];

  createdAt: Date;
  updatedAt: Date;

  deleted: boolean = false;
}

export class ColorSampleCreateInput {
  name: string;
  colorType: ColorType;
  converterSamples?: ColorConverterCreateInput[];
}
export class ColorSampleUpdateInput {
  name?: string;
  colorType?: ColorType;
  converterSamples?: ColorConverterUpdateInput[] | ColorConverterCreateInput[];
}

export class DocumentColor {
  /** id цвета присвоенного книге */
  id: number = 0;
  /** id шаблона цвета */
  sampleId: number;
  /** Шаблон цвета */
  sample: ColorSample;
  /** id выбранного конвертера */
  converterId: number | null;
  /** выбранный конвертер */
  converter: ColorConverter | null;
  /** id документа */
  documentId: number;
  /** Объем красителя в мл. */
  value: number;
  /** json data */
  data: {
    converterAmount: number;
    colerAmounts: Array<{ colerName: string; amount: number }>;
  } = {
    converterAmount: 0,
    colerAmounts: [],
  };
}

export class DocumentColorCreateInput {
  /** id шаблона цвета */
  sampleId: number;
  /** id документа */
  documentId: number;
  /** id выбранного конвертера */
  converterId?: number | null;
  /** Объем красителя в мл. */
  value?: number;
}

export class DocumentColorUpdateInput {
  /** id шаблона цвета */
  sampleId?: number;
  /** id документа */
  documentId?: number;
  /** id выбранного конвертера */
  converterId?: number | null;
  /** Объем красителя в мл. */
  value?: number;
}
