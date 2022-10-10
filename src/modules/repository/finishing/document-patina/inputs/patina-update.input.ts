import { PatinaType } from 'src/core/types/model-types/patina-types';

export class PatinaUpdateInput {
  id: number;
  name?: string;
  type?: PatinaType;
}
export class PatinaConverterUpdateInput {
  id: number;
  name?: string;
  value?: number;
}
export class PatinaColerUpdateInput {
  id: number;
  name?: string;
  value?: number;
}
