import { ColorType } from 'src/core/types/model-types/color-types';

export class SampleUpdateInput {
  id: number;

  name?: string;

  colorType?: ColorType;
}
