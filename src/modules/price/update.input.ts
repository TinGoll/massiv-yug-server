import { PriceTypes } from './price.types';

export class PriceUpdateInput {
  id: number;
  name?: string;
  conditionTree?: PriceTypes.Root;
}
