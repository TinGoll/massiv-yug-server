import nanoid from '../nanoid';
import { Vertex } from './vertex';

export class OrderVertex<G extends any = any> extends Vertex<string> {
  constructor(readonly options: G) {
    const id = nanoid();
    super(id);
  }

  getOptions(): G {
    return this.options;
  }
}
