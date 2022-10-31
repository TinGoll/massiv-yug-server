import { CreateSectorInput } from './create-sector.input';

export interface UpdateSectorInput extends Partial<CreateSectorInput> {
  id: number;
}
