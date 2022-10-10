import { PatinaType } from 'src/core/types/model-types/patina-types';

export class PatinaCreateInput {
  name: string;
  type: PatinaType;
  converters?: PatinaConverterCreateInput[];
}

export class PatinaConverterCreateInput {
  name: string;
  sampleId: number;
  value?: number;
  colers?: PatinaColerCreateInput[];
}
export class PatinaColerCreateInput {
  name: string;
  value?: number;
}
