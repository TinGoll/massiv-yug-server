import { PriceTypes } from './price.types';

export class PriceCreateInput {
  name: string;
  conditionTree?: PriceTypes.Root;
}
